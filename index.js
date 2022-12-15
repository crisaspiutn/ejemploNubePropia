const express=require('express')
const multer=require('multer')
const mimeTypes=require('mime-types')
const path=require('path')
const app=express()
const fs=require('fs')
// settings
app.set('port', process.env.PORT || 3002);
// app.set('views', path.join(__dirname,'views'));
// app.set('view engine','ejs');

// middlewares
app.use(express.urlencoded({extended: true}));//TRUE, sino dice object: null prototype
app.use(express.json());

// routes
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname,'src/index.html'));
  // res.render('index.ejs');
  console.log(req.ip);
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////// zona configuradora de multer
const storage=multer.diskStorage({// configura donde sea el almacen y que nombre colocara
  destination:"file/",
  filename:function(req,file,cb){
    cb("",Date.now()+"  "+file.originalname+"."+mimeTypes.extension(file.mimetype));
    //en el primer parametro se envia algo al usuario en html
    //en el segundo parametro se envia el nombre del archivo ","
  }
});
const upload=multer({// se configura la accion que hara el middleware
  // dest:'file' // quitando storage
  storage:storage
});
app.post('/files',upload.single("archi"),(req,res)=>{// se pone de middleware segun la configuracion de upload
  res.status(200).redirect("/");
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////// zona configuradora de multer
app.post('/info',function(req,res){
  // res.sendFile(path.join(__dirname,'src/index.html'));
  res.redirect("/")
  // res.render('index.ejs');
  console.log(req.ip);
  console.log(req.query);
  console.log(req.body);
  console.log(Object.values(req.body)[0])
  fs.writeFileSync('base.txt',req.body.tex,'utf-8');

});
console.log('hola ya puedo funcionar')
app.use(express.static(path.join(__dirname,'src')));
// handler
app.use((req,res,next)=>{
    res.status(404).send('no existe esta ruta');//parte para el navegador , otra parte para usuario
});
// 
console.log(app.get('port'));
app.listen(app.get('port'))
