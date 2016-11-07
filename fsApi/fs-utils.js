
var fs = require('fs');

module.exports = (function(){

    var fileTypeReg=/\.(html|css|js|txt|json|png|jpg|jpeg|gif)$/, //文件类型匹配 (.**)
        fileNameReg = /\/[^\/]+\.(html|css|js|txt|json|png|jpg|jpeg|gif)$/, //文件名匹配 (*.**)
		textTypeReg = /\.(html|css|js|txt|json)$/; //文本文件类型匹配 (.**)

    /***
     * 获取文件夹中的文件列表 依赖:[]
     * dirname: {String}文件夹名
     * callback(文件列表数组): {Function}回调*/
    function getFilesList(dirname,callback){
        var filesArray=[];
        (function iter(dirname){ //递归函数
            fs.readdir(dirname,function(err,files){
                var _filesArray,stop = true;
                if(err){throw err;}
                files.forEach(function(item,index){ //单步任务---分解任务
                    filesArray.push(dirname+ '/' +item);
                });
                filesArray.forEach(function(item,index){ //判断边界---基本情况
                    if(!item.match(fileTypeReg)){
                        stop = false;
                    }
                });
                if(stop){ // 到达边界---结束递归
                    callback && callback(filesArray);
                    return;
                }
                _filesArray = filesArray.concat();
                for(var i = 0,len=_filesArray.length;i<len;i++){ //减而治之---递归情况
                    if(!_filesArray[i].match(fileTypeReg)){
                        filesArray.splice(i,1);
                        iter(_filesArray[i]);
                        return;
                    }
                }
            })
        })(dirname);
    };
    /***
     * 文件内容修改 依赖:['buildDir']
     * options: {
     *     oldPath: { String }
     *     newPath: { String }
     *     regexp: { Regexp }
     *     replace: { String }
     *     callback: { Function }
     * }*/
    function updateFileContent(options){
        var opt = options || {},
            regexp = opt.regExp || '',
            replace = opt.replace || '',
            newdirname = opt.newPath.replace(fileNameReg,'');
        buildDir(newdirname,function(){
            var readS = fs.createReadStream(opt.oldPath),
                writeS = fs.createWriteStream(opt.newPath),
                str = '';
            readS.on('data',function(chunk){
				if(!opt.oldPath.match(textTypeReg)){
					str = chunk;
				}else{
					str = chunk.toString();
					str = str.replace(regexp,replace);
				}
                if( writeS.write(str) === false ){
                    readS.pause();
                }
            });
            writeS.on('drain',function(){
                readS.resume();
            })
            readS.on('end',function(){
                writeS.end();
                opt.callback && opt.callback();
            })
        })
    }
    /***
     * 文件目录生成 依赖:[]
     * dirname: {String}文件夹名
     * callback(): {Function}回调*/
    function buildDir(dirname,callback){
        var dirList = dirname.split('/'),
            base = '',
            i = 0;
        dirList.shift();
        base = './' +  dirList[0];
        (function iter(base){

            if(i >= dirList.length){
                callback && callback();
                return;
            }
            fs.exists(base,function(exist){
                i++;
                if(exist){
                    iter(base + '/' + dirList[i]);
                }else{
                    fs.mkdir(base,function(err){

                    })
                }
            })
        })(base);
    }
	/***
     * 删除文件 依赖:[]
     * dirPath: {String}文件(夹)路径
     * callback(): {Function}回调*/
	function deleteDir(dirPath,callback){
		var item;
		(function iter(path){
			fs.exists(dirPath,function(exist){
				if(!exist){
					callback && callback();
				} else {
					fs.stat(path,function(err,stats){
						if(stats.isFile()){
							fs.unlink(path,function(err){
								if(err){throw err;}
								console.log( '删除文件：' + path + '成功' );
							});
						}else if(stats.isDirectory()){
							fs.readdir(path,function(err,files){
								if(err){throw err;}
								if(files.length){									
									if(files[files.length-1].match(fileTypeReg)){
										item = files.pop();
										fs.unlink(path + '/' + item,function(err){
											if(err){throw err;}
											console.log( '删除文件：' + path + '/' + item + '成功' );
											iter(path);
										});
									}else{
										iter(path + '/' + files.pop());
									}
								}else{
									fs.rmdir(path,function(err){
										if(err){throw err;}
										console.log('删除空文件夹：' + path + '成功');
										iter(dirPath);
									})
								}
							})
						}
					})
				}
			})	
		})(dirPath);
	}

    return {
        'getFilesList': getFilesList,
        'updateFileContent': updateFileContent,
        'buildDir': buildDir,
		'deleteDir': deleteDir
    };
})();






