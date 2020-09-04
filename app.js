


// GET VALUE
var x;var y;var z; var xy; var yz;var zx;var r1;var r2; var r3;num=1;var sigmaP=[0,0,0];var numStr = ['FIRST','SECOND','THIRD'];
function solution(){
    x = document.getElementById('sigma-x').value
    y = document.getElementById('sigma-y').value
    z = document.getElementById('sigma-z').value
    xy = document.getElementById('taw-xy').value
    yz = document.getElementById('taw-yz').value
    zx = document.getElementById('taw-zx').value
    r1 = [x,xy,zx];
    r2 = [xy,y,yz];
    r3 = [zx,yz,z];
    localStorage.setItem('r1',JSON.stringify(r1))
    localStorage.setItem('r2',JSON.stringify(r2))
    localStorage.setItem('r3',JSON.stringify(r3))
    if (x=='' || y=='' || z=='' || xy=='' || yz=='' || zx=='') {
        document.getElementById('input-error').innerHTML = 'PLEASE ENTER ALL THE INPUTS !'
    }else{
        window.location.href = 'solution.html'
    }
}
tensor()
invariants()
principal()
solveCond()




function tensor(){
    r1 = JSON.parse(localStorage.getItem('r1'));
    r2 = JSON.parse(localStorage.getItem('r2'));
    r3 = JSON.parse(localStorage.getItem('r3'));
    tr = [r1,r2,r3]
    for (let count = 0; count < 3; count++) {
    for (let index = 0; index < 3; index++) {
    document.getElementById('matrix').children[count].innerHTML += `   <div>${tr[count][index]}</div>`
}
}
}


var a; var b;var c;
function invariants(){
r1 = [parseFloat(r1[0]),parseFloat(r1[1]),parseFloat(r1[2])];
r2 = [parseFloat(r2[0]),parseFloat(r2[1]),parseFloat(r2[2])];
r3 = [parseFloat(r3[0]),parseFloat(r3[1]),parseFloat(r3[2])];

a = (r1[0]+r2[1]+r3[2]);
 document.getElementById('i1').innerHTML += ' = ' + a;

 b = (r1[0]*r2[1]+r2[1]*r3[2]+r1[0]*r3[2] - ( r1[1]**2 + r2[2]**2 + r3[0]**2 ) );
document.getElementById('i2').innerHTML += ' = ' + b;

c = ( (r1[0]*r2[1]*r3[2]) + 2 * ( r1[1] * r2[2] * r3[0] ) - ( r3[2] * r1[1]**2 + r1[0] * r2[2]**2 + r2[1]  * r3[0]**2 ) );
 document.getElementById('i3').innerHTML += ' = ' + c;

}

// Principal Stresses
var p; 
function principal(){
 //solution
 newtonRaphson()
//   FIND distribution
  maxP = Math.max(sigmaP[0],sigmaP[1],sigmaP[2]);
  minP = Math.min(sigmaP[0],sigmaP[1],sigmaP[2]);
  for (let index = 0; index < 3; index++) {
if (minP != sigmaP[index] && maxP != sigmaP[index]) {
    interP = sigmaP[index];   
}     
  }
  document.getElementById('s1').innerHTML += maxP;
  document.getElementById('s2').innerHTML += interP;
  document.getElementById('s3').innerHTML += minP;
}



// Principal stresses angles
var condP;var sortP;var cosA;
function solveCond(){
sortP  = [maxP,interP,minP];
condP = document.getElementById('cond-p');
// form matrix
for (let index = 0; index < 3; index++) {

    nr1 = [r1[0]-sortP[index],r1[1],r1[2]]
    nr2 = [r2[0],r2[1]-sortP[index],r2[2]]
    nr3 = [r3[0],r3[1],r3[2]-sortP[index]]

    condP.innerHTML += `
    <div class="cond-heading"> ${index+1}) When &#963;<sub>n</sub> = ${sortP[index]} </div>

<div class="matrix col-lg-3 col-lg-3 col-lg-10 col-12 ">
 <div class="r1">
<div>${nr1[0].toFixed(3)}</div>
<div>${r1[1]}</div>
<div>${r1[2]}</div>
</div>

<div class="r2">
<div>${r2[0]}</div>
<div>${nr2[1].toFixed(3)}</div>
<div>${r2[2]}</div>
 </div>

 <div class="r3">
<div>${r3[0]}</div>
<div>${r3[1]}</div>
<div>${nr3[2].toFixed(3)}</div>
    </div>
    `
    condP.innerHTML +=`
    <div class="write text-center mx-auto mt-4">(${nr1[0].toFixed(3)}) l<sub>${index+1}</sub> + (${r1[1]}) m<sub>${index+1}</sub> + (${r1[2]}) n<sub>${index+1}</sub> = 0 </div>

    <div class="write text-center mx-auto">(${r2[0]}) l<sub>${index+1}</sub> + (${nr2[1].toFixed(3)}) m<sub>${index+1}</sub> + (${r2[2]}) n<sub>${index+1}</sub> = 0 </div>

    <div class="write text-center mx-auto">(${r3[0]}) l<sub>${index+1}</sub> + (${r3[1]}) m<sub>${index+1}</sub> + (${nr3[2].toFixed(3)}) n<sub>${index+1}</sub> = 0 </div>
    
    <div class="write text-center mb-4 mx-auto">l<sub>${index+1}</sub><sup>2</sup> + m<sub>${index+1}</sub><sup>2</sup> + n<sub>${index+1}</sub><sup>2</sup> = 1 </div>
    <div></div>
    </div>
    `


condTest()

 //solve a system of nonlinear equations
if ( (((npr1[0]/npr2[1])*npr2[0] + npr1[0]) == 0 || ((npr1[0]/npr2[1])*npr2[0] - npr1[0] ) == 0) && (((npr1[0]/npr2[1])*npr2[1] + npr1[1]) == 0 || ((npr1[0]/npr2[1])*npr2[1] - npr1[1] ) == 0) && (((npr1[0]/npr2[1])*npr2[2] + npr1[2]) == 0 || ((npr1[0]/npr2[1])*npr2[2] - npr1[2] ) == 0) ) {
    cosA = ['Undefined','Undefined','Undefined']
    console.log(cosA)
}else if (npr1[0]!=0 && npr1[1]==0 && npr1[2]==0 ) {
    cosA = nerdamer.solveEquations([`${npr1[0]} * x + ${npr1[1]} * y + ${npr1[2]} * z=0`, ` ${npr2[0]} * x + ${npr2[1]} * y+ ${npr2[2]} * z=0`, `y^2+z^2=1`]);    
}else if (npr1[0]==0 && npr1[1]!=0 && npr1[2]==0 ) {
    cosA = nerdamer.solveEquations([`${npr1[0]} * x + ${npr1[1]} * y + ${npr1[2]} * z=0`, ` ${npr2[0]} * x + ${npr2[1]} * y+ ${npr2[2]} * z=0`, `x^2+z^2=1`]);    
}else if (npr1[0]==0 && npr1[1]==0 && npr1[2]!=0 ) {
    cosA = nerdamer.solveEquations([`${npr1[0]} * x + ${npr1[1]} * y + ${npr1[2]} * z=0`, ` ${npr2[0]} * x + ${npr2[1]} * y+ ${npr2[2]} * z=0`, `x^2+y^2=1`]);    
}else{
 cosA = nerdamer.solveEquations([`${npr1[0]} * x + ${npr1[1]} * y + ${npr1[2]} * z=0`, ` ${npr2[0]} * x + ${npr2[1]} * y+ ${npr2[2]} * z=0`, `x^2+y^2+z^2=1`]); 
}
cosineResult()
}
num=1;
}


function condTest(){
    // condition 1
    if (nr1[0]==0 && nr1[1]==0 && nr1[2]==0 && nr2[0]==0 && nr3[0]==0) {
       npr1 = nr2;
       npr2 = nr3; 
    }else if(nr2[0]==0 && nr2[1]==0 && nr2[2]==0 && nr1[1]==0 && nr3[1]==0) {
        npr1 = nr1;
        npr2 = nr3; 
     }else if(nr3[0]==0 && nr3[1]==0 && nr3[2]==0 && nr2[2]==0 && nr1[2]==0) {
        npr1 = nr1;
        npr2 = nr2; 
     }
    //  condition 2
    else if ((nr1[0]==0 && nr1[1]==0 ) || (nr1[2]==0 && nr1[0]==0) || (nr1[1]==0 && nr1[2]==0)) {
        npr1 = nr1;
        npr2 = nr3; 
     }else if((nr2[0]==0 && nr2[1]==0 ) || (nr2[2]==0 && nr2[0]==0) || (nr2[1]==0 && nr2[2]==0)) {
         npr1 = nr2;
         npr2 = nr3; 
      }else if((nr3[0]==0 && nr3[1]==0 ) || (nr3[2]==0 && nr3[0]==0) || (nr3[1]==0 && nr3[2]==0)) {
         npr1 = nr3;
         npr2 = nr2; 
      }else{
          npr1 = nr1;
          npr2 = nr2;
      }
}


var num=1;
function cosineResult(){
    // infinity cond
if (cosA[0]=='Undefined') {
    document.getElementById('cond-p').innerHTML +=  ` 
    <div class="resultCos text-center" ><div class='result-sub-heading'>${numStr[num-1]} PRINCIPAL AXIS DIRECTED ALONG UNIT VECTOR N <sub>${num}</sub> : </div> N<sub>${num}</sub> =  ${cosA[0]} i + ${cosA[1]} j + ${cosA[2]} k </div>
    `
}else{
// other cond test
    if ((cosA[0][1]<0 && cosA[1][1]<0) || (cosA[1][1]<0 && cosA[2][1]<0) || (cosA[2][1]<0 && cosA[0][1]<0)) {

        if (cosA[0][1]<0 && cosA[1][1]<0) {
            document.getElementById('cond-p').innerHTML +=  ` 
            <div class="resultCos text-center" ><div class='result-sub-heading'>${numStr[num-1]} PRINCIPAL AXIS DIRECTED ALONG UNIT VECTOR N <sub>${num}</sub> : </div> N<sub>${num}</sub> =  (${cosA[0][1].toFixed(5)}) i + (${cosA[1][1].toFixed(5)}) j <u>+</u> ${cosA[2][1].toFixed(5)} k </div>
            `
        }else if (cosA[1][1]<0 && cosA[2][1]<0) {
            document.getElementById('cond-p').innerHTML +=  ` 
            <div class="resultCos text-center" ><div class='result-sub-heading'>${numStr[num-1]} PRINCIPAL AXIS DIRECTED ALONG UNIT VECTOR N <sub>${num}</sub> : </div> N<sub>${num}</sub> = <u>+</u> ${cosA[0][1].toFixed(5)} i + (${cosA[1][1].toFixed(5)}) j + (${cosA[2][1].toFixed(5)}) k </div>
            `
        }else if (cosA[2][1]<0 && cosA[0][1]<0) {
            document.getElementById('cond-p').innerHTML +=  ` 
            <div class="resultCos text-center" ><div class='result-sub-heading'>${numStr[num-1]} PRINCIPAL AXIS DIRECTED ALONG UNIT VECTOR N <sub>${num}</sub> : </div> N<sub>${num}</sub> = (${cosA[0][1].toFixed(5)}) i <u>+</u> ${cosA[1][1].toFixed(5)} j + (${cosA[2][1].toFixed(5)}) k </div>
            `
        }    
    }else if (cosA[0][1]<0 || cosA[1][1]<0 || cosA[2][1]<0) {
if (cosA[0][1]<0) {
    document.getElementById('cond-p').innerHTML +=  ` 
    <div class="resultCos text-center" ><div class='result-sub-heading'>${numStr[num-1]} PRINCIPAL AXIS DIRECTED ALONG UNIT VECTOR N <sub>${num}</sub> : </div> N<sub>${num}</sub> =  (${cosA[0][1].toFixed(5)}) i <u>+</u> ${cosA[1][1].toFixed(5)} j <u>+</u> ${cosA[2][1].toFixed(5)} k </div>
    `
}else if (cosA[1][1]<0) {
    document.getElementById('cond-p').innerHTML +=  ` 
    <div class="resultCos text-center" ><div class='result-sub-heading'>${numStr[num-1]} PRINCIPAL AXIS DIRECTED ALONG UNIT VECTOR N <sub>${num}</sub> : </div> N<sub>${num}</sub> = <u>+</u> ${cosA[0][1].toFixed(5)} i + (${cosA[1][1].toFixed(5)}) j <u>+</u> ${cosA[2][1].toFixed(5)} k </div>
    `
}else if (cosA[2][1]<0) {
    document.getElementById('cond-p').innerHTML +=  ` 
    <div class="resultCos text-center" ><div class='result-sub-heading'>${numStr[num-1]} PRINCIPAL AXIS DIRECTED ALONG UNIT VECTOR N <sub>${num}</sub> : </div> N<sub>${num}</sub> = <u>+</u> ${cosA[0][1].toFixed(5)} i <u>+</u> ${cosA[1][1].toFixed(5)} j + (${cosA[2][1].toFixed(5)}) k </div>
    `
}   
}else if (cosA[0][1]<0 && cosA[1][1]<0 && cosA[2][1]){
    document.getElementById('cond-p').innerHTML +=  ` 
    <div class="resultCos text-center" ><div class='result-sub-heading'>${numStr[num-1]} PRINCIPAL AXIS DIRECTED ALONG UNIT VECTOR N <sub>${num}</sub> : </div> N<sub>${num}</sub> =  (${cosA[0][1].toFixed(5)}) i + (${cosA[1][1].toFixed(5)}) j + (${cosA[2][1].toFixed(5)}) k </div>
    `
}else{
    document.getElementById('cond-p').innerHTML +=  ` 
    <div class="resultCos text-center" ><div class='result-sub-heading'>${numStr[num-1]} PRINCIPAL AXIS DIRECTED ALONG UNIT VECTOR N <sub>${num}</sub> : </div> N<sub>${num}</sub> =  <u>+</u> ${cosA[0][1].toFixed(5)} i <u>+</u> ${cosA[1][1].toFixed(5)} j <u>+</u> ${cosA[2][1].toFixed(5)} k </div>
    `  
}
}
    num = num +1;
}



var v1;var v2; var eq;var v3;var v4;
function newtonRaphson(){

    // root between 2 values
    for (let index = -1000; index < 1000; index++) {
        eq = index**3 - a*index**2+b*index-c
        if (eq>0) {
            v1=eq;
        } 
                    if (eq<0) {
                    v2=eq;
                    }
    }
    v4 = (v1+v2)/2;

    // one root
    for (let index = 0; index < 1000; index++) {        
        v3=v4;
        v4 =v3 -  ((v3**3 - a*v3**2+b*v3-c) / (3*v3**2 - 2*a*v3+b))
        v4 = parseFloat(v4.toFixed(5))
        if (v4==v3) {
            break;
        }
    }
sigmaP[0] = parseFloat(v4.toFixed(3));

// other root
bb = v4-a;
cc = v4*bb+b;
p = nerdamer.solve(`x^2+${bb}x+${cc}`, 'x');
pp = (p.toString());
pp = pp.split(']')[0].split('[')[1].split(',');
if (pp.length == 1) {
    sigmaP[1]= parseFloat(eval(pp[0]).toFixed(3))
    sigmaP[2]= parseFloat(eval(pp[0]).toFixed(3))
    interP = sigmaP[2]
}else if(pp.length ==2 ){
sigmaP[1]= parseFloat(eval(pp[0]).toFixed(3))
sigmaP[2]= parseFloat(eval(pp[1]).toFixed(3))
}
}








