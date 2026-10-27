/* Navegación, gestos y glosario. ir() es global porque los botones del HTML la invocan. */
const glosario={
"ADN":"Ácido desoxirribonucleico. Molécula que guarda las instrucciones para construir y operar un organismo.",
"genes":"Tramos del ADN con instrucciones para una función concreta, como producir una proteína.",
"epigenética":"Estudio de los cambios en la actividad de los genes que no modifican la secuencia del ADN.",
"metilación del ADN":"Marca química (un grupo CH₃) que se añade al ADN y que suele reducir la actividad del gen en esa zona.",
"chip 450k":"Chip de laboratorio (Illumina HumanMethylation450) que mide la metilación en unas 450.000 posiciones del genoma.",
"fenotipo":"Características observables de una persona, resultado de combinar genética y entorno.",
"esquizofrenia":"Trastorno mental grave que afecta el pensamiento, la percepción y el comportamiento.",
"biomarcadores":"Indicadores biológicos medibles que ayudan a identificar una enfermedad de forma objetiva.",
"firma epigenética":"Conjunto de posiciones del genoma con metilación distinta entre dos grupos. Importa el patrón completo.",
"sangre periférica":"Sangre que circula por el cuerpo y se obtiene con una extracción común.",
"NCBI GEO":"Repositorio público de EE. UU. con datos de miles de estudios genómicos.",
"armonizarse":"Corregir las diferencias técnicas entre laboratorios para que los datos sean comparables.",
"modelo supervisado":"Algoritmo que aprende a clasificar a partir de ejemplos con respuesta conocida.",
"AUC-ROC":"Mide qué tan bien el modelo distingue entre dos grupos. 1,0 es perfecto y 0,5 equivale al azar.",
"F1":"Mide el equilibrio entre aciertos y omisiones al asignar la clase. 1,0 es el mejor valor.",
"validación cruzada":"Técnica que divide los datos en partes y rota cuál se usa para evaluar, para no medir con lo ya visto.",
"LOGO":"Leave-one-cohort-out. Se evalúa sobre un estudio completo que el modelo nunca vio.",
"plataforma web":"Aplicación a la que se entra desde un navegador, sin instalar nada. Aquí se construyó sobre PERASArc (Django y Vue.js).",
"CSV armonizado":"Archivo de tabla con las columnas exactas que el modelo espera, ya procesado por el laboratorio.",
"valor beta":"Número entre 0 y 1 que resume la metilación de un sitio en una persona. 0 es nada metilado y 1 es metilado del todo. Cada celda de la matriz guarda uno.",
"sitio CpG":"Lugar del genoma donde una citosina va seguida de una guanina. En los archivos se llama cg… y es una columna de la matriz.",
"gsm_id":"Identificador de una muestra en GEO. En la matriz, cada fila es un gsm_id: una persona.",
"regRCPqn":"Ajuste del laboratorio, en R, que pone las matrices de los estudios en una escala común. Usa GSE84727, de Aberdeen, como referencia. Ocurre antes de entrenar.",
"panel congelado":"Lista fija de sitios CpG guardada en panel_cpg_final.txt. Se eligió dentro de cada pliegue al entrenar. La web la reutiliza y no vuelve a filtrar.",
"holdout":"447 personas (227 con esquizofrenia y 220 controles), el 20 % apartado por el laboratorio. Se midió una sola vez y no eligió al ganador. Son personas de los mismos cinco estudios, no un laboratorio nuevo.",
"camino A/B":"Dos entregas del mismo panel. A (v1-prod100) residualiza nueve covariables. B (v1-prod100-b) usa solo el panel, sin residualizar, y es el que abre el formulario. B no es un recorte del archivo A.",
"camino A":"Entrega v1-prod100. El joblib residualiza el panel con nueve covariables y después clasifica. El ajuste prod_100 usa las 2.229 muestras etiquetadas.",
"camino B":"Entrega v1-prod100-b. Otros tres joblib, solo con el panel y sin residualizar. El formulario abre aquí. No es un recorte del archivo del camino A.",
"joblib":"Archivo en el que Python guarda un modelo ya entrenado. La plataforma lo carga para calcular; no lo vuelve a ajustar.",
"covariables":"Datos que acompañan a la metilación: sexo, edad epigenética, humo y fracciones de células. En el camino A el joblib las usa para residualizar. No entran como columnas extra del clasificador.",
"dasen":"Normalización del laboratorio, en R, que deja comparables las lecturas del chip 450k. Es anterior al entrenamiento de este trabajo.",
"BMIQ":"Ajuste del laboratorio, en R, que corrige el sesgo entre los dos tipos de sonda del chip. Va junto a dasen, antes de mezclar los estudios.",
"EpiDISH":"Cálculo en R de las fracciones de células de la sangre. El laboratorio lo hace antes de mezclar los estudios.",
"EpiSmokEr":"Cálculo en R de la exposición al humo a partir de la metilación. También ocurre antes de mezclar.",
"methylclock":"Cálculo en R de la edad epigenética, después de regRCPqn. Esa edad es una de las nueve covariables del camino A.",
"ComBat":"Ajuste de diferencias entre estudios. El laboratorio lo aplica después, junto con la partición 80/20. La página no lo ejecuta.",
"CV anidada":"Diez pliegues externos, estratificados, miden el desempeño. Un anillo interno elige k y los hiperparámetros. Usa las 1.782 personas de entrenamiento, mezcladas de los mismos estudios.",
"p_scz":"Probabilidad que el modelo asigna a la clase esquizofrenia en esa muestra. La página muestra la clase, SCZ o CNT, y este número.",
"smoking_SSc":"Puntaje de humo estimado por EpiSmokEr desde la propia metilación. En el camino A se residualiza, y al restarlo se quita señal que venía del chip.",
"edad epigenética":"Edad estimada por methylclock a partir de la metilación, no la edad de calendario. Es una de las nueve covariables del camino A.",
"sondas ch.":"639 sondas que el encabezado FINAL todavía traía y que este trabajo quitó antes del filtro de varianza. El conteo pasa de 227.962 sitios a 227.323.",
"Mann-Whitney":"Prueba usada dentro del entrenamiento para comparar cada sitio entre los dos grupos antes de fijar k. No describe una dirección única de metilación en todo el archivo.",
"Platt":"Calibración que convierte la distancia de la SVM lineal en una probabilidad. Por eso el archivo se llama pipeline_svm_platt_prod_100.joblib."};

const $=s=>document.querySelector(s),P=[...document.querySelectorAll('.pagina')],N=P.length,quieto=matchMedia('(prefers-reduced-motion:reduce)');
let a=0,ocupado=false;
const ico=d=>`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${d}"/></svg>`,IZQ='M15 5l-7 7 7 7',DER='M9 5l7 7-7 7';
function mk(c,l,d,f){const b=document.createElement('button');b.className=c;b.type='button';b.setAttribute('aria-label',l);if(d)b.innerHTML=ico(d);b.onclick=f;return b}
$('#ant').innerHTML=ico(IZQ);$('#sig').innerHTML=ico(DER);
$('#ant').onclick=()=>ir(a-1);$('#sig').onclick=()=>ir(a+1);
const bp=mk('bb','Página anterior',IZQ,()=>ir(a-1)),bn=mk('bb','Página siguiente',DER,()=>ir(a+1)),pts=document.createElement('div'),cont=document.createElement('span');
pts.className='pts';cont.id='cont';cont.setAttribute('aria-live','polite');
P.forEach((_,i)=>pts.append(mk('punto','Ir a la página '+(i+1),0,()=>ir(i))));
$('#progreso').append(bp,pts,cont,bn);

function ui(){
  document.querySelectorAll('.punto').forEach((d,i)=>d.classList.toggle('activo',i===a));
  cont.textContent=(a+1)+' / '+N;
  $('#top').style.width=(a/(N-1)*100)+'%';
  [$('#ant'),bp].forEach(b=>b.disabled=a===0);
  [$('#sig'),bn].forEach(b=>b.disabled=a===N-1);
  try{history.replaceState(null,'','#p'+(a+1))}catch(e){}
}
function ir(n){
  if(ocupado||n===a||n<0||n>=N)return;
  const dir=n>a?1:-1,o=P[a],p=P[n];a=n;ocupado=true;
  o.classList.remove('activa');o.classList.add(dir>0?'saliendo-izq':'saliendo-der');o.inert=true;
  if(dir<0){p.style.transition='none';p.classList.add('desde-izq');void p.offsetWidth;p.style.transition='';p.classList.remove('desde-izq')}
  p.inert=false;p.scrollTop=0;p.classList.add('activa');
  setTimeout(()=>{o.classList.remove('saliendo-izq','saliendo-der');ocupado=false},quieto.matches?0:520);
  ui();ocu();$('#hint')?.remove();
  p.querySelector('h1').focus({preventScroll:true});
}

/* Inicio: respeta el enlace directo (#p5) */
const h=+((location.hash.match(/^#p(\d+)$/)||[])[1]);
if(h>=1&&h<=N)a=h-1;
P.forEach((p,i)=>p.inert=i!==a);P[a].classList.add('activa');ui();
setTimeout(()=>$('#hint')?.remove(),5000);

/* Teclado y gestos */
document.addEventListener('keydown',e=>{
  if(e.key==='ArrowRight')ir(a+1);else if(e.key==='ArrowLeft')ir(a-1);
  else if(e.key==='Home')ir(0);else if(e.key==='End')ir(N-1);else if(e.key==='Escape')ocu();
});
let x0=null,y0=null;
const libro=$('#libro');
libro.addEventListener('touchstart',e=>{x0=e.touches[0].clientX;y0=e.touches[0].clientY},{passive:true});
libro.addEventListener('touchend',e=>{
  if(x0===null)return;
  const t=e.changedTouches[0],dx=t.clientX-x0,dy=t.clientY-y0;x0=y0=null;
  if(Math.abs(dx)<56||Math.abs(dx)<=Math.abs(dy)*1.15)return;
  dx<0?ir(a+1):ir(a-1);
},{passive:true});

/* Términos con definición */
const tip=$('#tip'),conHover=matchMedia('(hover:hover)').matches;
let actual=null;
function ver(el){
  const k=el.dataset.k||el.textContent.trim(),d=glosario[k];if(!d)return;
  tip.innerHTML='<b></b><span></span>';tip.firstChild.textContent=k;tip.lastChild.textContent=d;
  tip.classList.add('ver');actual=el;
  const r=el.getBoundingClientRect(),w=tip.offsetWidth,hh=tip.offsetHeight;
  tip.style.left=Math.min(Math.max(8,r.left+r.width/2-w/2),innerWidth-w-8)+'px';
  tip.style.top=(r.top-hh-10<8?r.bottom+10:r.top-hh-10)+'px';
}
function ocu(){tip.classList.remove('ver');actual=null}
document.addEventListener('mouseover',e=>{const t=conHover&&e.target.closest('.t');if(t)ver(t)});
document.addEventListener('mouseout',e=>{if(e.target.closest('.t'))ocu()});
document.addEventListener('focusin',e=>{if(e.target.matches&&e.target.matches('.t:focus-visible'))ver(e.target)});
document.addEventListener('focusout',e=>{if(e.target.closest&&e.target.closest('.t'))ocu()});
document.addEventListener('click',e=>{
  const t=e.target.closest('.t');
  if(t&&!conHover){actual===t?ocu():ver(t)}else if(!t)ocu();
});
document.addEventListener('scroll',ocu,true);
