import { arch } from "os";

GL.GMVI.Extend=function(dest,args){
   for(var key in args){
       dest[key]=args[key];
   }
   return dest;
}