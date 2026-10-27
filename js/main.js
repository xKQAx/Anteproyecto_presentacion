/* Navegación, gestos y glosario. ir() es global porque los botones del HTML la invocan. */
const glosario={
"ADN":"Ácido desoxirribonucleico. Molécula que guarda las instrucciones para construir y operar un organismo.",
"genes":"Tramos del ADN con instrucciones para una función concreta, como producir una proteína.",
"epigenética":"Estudio de los cambios en la actividad de los genes que no modifican la secuencia del ADN.",
"metilación del ADN":"Grupo CH₃ que se añade al ADN. En este proyecto suele asociarse a menor actividad del gen; no es una ley de este dataset.",
"chip 450k":"HumanMethylation450: mide unas 450.000 posiciones. El chip EPIC, de 850k, queda fuera de este trabajo.",
"fenotipo":"En este trabajo es la etiqueta clínica de la fila, SCZ o CNT. El gsm_id la alinea con los betas de esa muestra.",
"esquizofrenia":"Trastorno mental grave que afecta el pensamiento, la percepción y el comportamiento.",
"biomarcadores":"Indicadores biológicos medibles que ayudan a identificar una enfermedad de forma objetiva.",
"firma epigenética":"Patrón de sitios CpG que se compara entre los dos grupos. Importa el conjunto, no una marca aislada ni una dirección global de metilación.",
"sangre periférica":"Sangre que circula por el cuerpo y se obtiene con una extracción común.",
"NCBI GEO":"Repositorio público de EE. UU. con datos de miles de estudios genómicos.",
"armonizarse":"Armoniza las cohortes sin usar el diagnóstico. La referencia es GSE84727. No es el filtro de varianza ni dasen o BMIQ.",
"armoniza":"Armoniza las cohortes sin usar el diagnóstico. La referencia es GSE84727. No es el filtro de varianza ni dasen o BMIQ.",
"cohorte":"Cada GSE es una cohorte. En el archivo FINAL entran cinco: GSE80417, GSE84727, GSE116378, GSE116379 y GSE152027. GSE147221 quedó excluida.",
"modelo supervisado":"Algoritmo que aprende a clasificar a partir de ejemplos con respuesta conocida.",
"AUC-ROC":"Ordena casos frente a controles: 0,50 es el azar y 1,0 es perfecto. La meta del anteproyecto era ≥ 0,75 y ningún modelo FINAL la cruza. KNN, el mejor, llega a 0,678 ± 0,051 en la CV y a 0,696 en el holdout.",
"F1":"Equilibra la etiqueta en el corte que asigna la clase. La meta era ≥ 0,70 y ningún modelo FINAL la cruza. KNN, el mejor: 0,661 ± 0,039 en la CV y 0,686 en el holdout.",
"validación cruzada":"Técnica que divide los datos en partes y rota cuál se usa para evaluar, para no medir con lo ya visto.",
"LOGO":"Cada test es un GSE entero que el modelo no vio. En el brazo B, sin covariables, los cinco AUC quedan cerca del azar (~0,38–0,53). El 0,472 es el KNN de ese brazo, no el resultado principal.",
"plataforma web":"Aplicación a la que se entra desde un navegador, sin instalar nada. Aquí se construyó sobre PERASArc (Django y Vue.js).",
"CSV armonizado":"Tabla que la SPA recibe ya procesada. No ejecuta dasen, BMIQ, regRCPqn, EpiDISH, EpiSmokEr ni methylclock, ni reentrena.",
"valor beta":"Número entre 0 y 1: qué tan metilado está un sitio en una muestra. Es la celda de la matriz.",
"sitio CpG":"Columna cg… del chip. El modelo no mira un gen: mira miles de estas columnas.",
"gsm_id":"Identificador que alinea la fila de fenotipo con la fila de betas.",
"regRCPqn":"Armoniza las cohortes sin usar el diagnóstico. La referencia es GSE84727. No es el filtro de varianza ni dasen o BMIQ.",
"panel congelado":"Tras quitar 639 sondas ch. quedan 227.323 sitios. El filtro de varianza, con umbral 0,001, deja 66.441, fijados en panel_cpg_final.txt. La web no vuelve a filtrar.",
"holdout":"447 personas (227 SCZ / 220 CNT), el 20 % apartado por el laboratorio y medido una vez. Mezcla los mismos cinco estudios: no es un laboratorio nuevo.",
"selección dentro del pliegue":"Mann-Whitney y SelectKBest eligen k solo con el train de ese pliegue, para no mirar el examen. La moda de la CV anidada FINAL es KNN 881, Random Forest 558 y SVM 137.",
"camino A/B":"Dos entregas del mismo panel. A (v1-prod100) residualiza nueve covariables. B (v1-prod100-b) usa solo el panel, sin residualizar, y es el que abre el formulario. B no es un recorte del archivo A.",
"camino A":"Entrega v1-prod100. El joblib residualiza nueve covariables: sexo, edad epigenética, smoking_SSc, B, NK, CD4T, CD8T, Mono y Eosino. Neutro no entra. No son columnas extra del clasificador, y prod_100 usa las 2.229 muestras etiquetadas.",
"camino B":"Entrega v1-prod100-b: solo el panel, en joblibs *_sin_cov.joblib, sin residualizar. El formulario abre en B. No es un recorte del archivo A.",
"joblib":"Archivo con el modelo ya entrenado. La plataforma lo carga para calcular la clase y p_scz; no reentrena.",
"covariables":"Datos que acompañan a la metilación: sexo, edad epigenética, humo y fracciones de células. En el camino A el joblib las usa para residualizar. No entran como columnas extra del clasificador.",
"dasen":"Normalización del laboratorio, en R, que deja comparables las lecturas del chip 450k. Es anterior al entrenamiento de este trabajo.",
"BMIQ":"Ajuste del laboratorio, en R, que corrige el sesgo entre los dos tipos de sonda del chip. Va junto a dasen, antes de mezclar los estudios.",
"EpiDISH":"Cálculo en R de las fracciones de células de la sangre. El laboratorio lo hace antes de mezclar los estudios.",
"EpiSmokEr":"Cálculo en R de la exposición al humo a partir de la metilación. También ocurre antes de mezclar.",
"methylclock":"Cálculo en R de la edad epigenética, después de regRCPqn. Esa edad es una de las nueve covariables del camino A.",
"ComBat":"Ajuste de diferencias entre estudios. El laboratorio lo aplica después, junto con la partición 80/20. La página no lo ejecuta.",
"CV anidada":"Diez pliegues externos estratificados miden el desempeño. Un anillo interno elige k y los hiperparámetros. El train reúne 1.782 personas.",
"p_scz":"Probabilidad de la clase SCZ. La página muestra esa probabilidad y la clase SCZ o CNT, con el aviso: «Herramienta de investigación; no constituye diagnóstico clínico.»",
"smoking_SSc":"Puntaje de humo estimado por EpiSmokEr desde la propia metilación. En el camino A se residualiza, y al restarlo se quita señal que venía del chip.",
"edad epigenética":"Edad estimada por methylclock a partir de la metilación, no la edad de calendario. Es una de las nueve covariables del camino A.",
"sondas ch.":"639 sondas que el encabezado FINAL todavía traía y que este trabajo quitó antes del filtro de varianza. El conteo pasa de 227.962 sitios a 227.323.",
"Mann-Whitney":"Junto con SelectKBest, elige k solo con el train de ese pliegue, para no mirar el examen. No describe una dirección única de metilación.",
"Platt":"Calibración que convierte la distancia de la SVM lineal en una probabilidad. Por eso el archivo se llama pipeline_svm_platt_prod_100.joblib."};

document.documentElement.classList.add('js');
/* Las frases del glosario visible mandan sobre el objeto, para que el tooltip diga lo mismo. */
document.querySelectorAll('.glosario [data-k]').forEach(n=>{
  const dd=n.querySelector('dd');
  if(dd) glosario[n.dataset.k]=dd.textContent.replace(/\s+/g,' ').trim();
});
if(glosario.regRCPqn){glosario.armoniza=glosario.armonizarse=glosario.regRCPqn}

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
  recorrido(p);
}
/* Ilumina una etapa del archivo. Con menos movimiento se ve el recorrido completo. */
function recorrido(p){
  const ol=p.querySelector('.recorrido'); if(!ol) return;
  const items=[...ol.children].filter(n=>n.tagName==='LI');
  const ley=p.querySelector('.paso-leyenda'),btn=p.querySelector('.paso-sig');
  if(ley&&!ley.dataset.base) ley.dataset.base=ley.textContent.trim();
  if(quieto.matches){
    ol.classList.add('completo');
    items.forEach(li=>li.classList.remove('ahora','visto'));
    if(ley) ley.textContent=ley.dataset.base;
    return;
  }
  ol.classList.remove('completo');
  ol.dataset.i='0';
  const pintar=()=>{
    const i=+ol.dataset.i;
    items.forEach((li,k)=>{li.classList.toggle('ahora',k===i);li.classList.toggle('visto',k<i)});
    if(ley) ley.textContent=items[i].dataset.txt||ley.dataset.base;
    if(btn) btn.textContent=i===items.length-1?'Reiniciar recorrido':'Siguiente etapa';
  };
  pintar();
  if(btn&&!btn.dataset.listo){
    btn.dataset.listo='1';
    btn.addEventListener('click',ev=>{
      ev.stopPropagation();
      ol.dataset.i=String((+ol.dataset.i+1)%items.length);
      pintar();
    });
  }
}

/* Inicio: respeta el enlace directo (#p5) */
const h=+((location.hash.match(/^#p(\d+)$/)||[])[1]);
if(h>=1&&h<=N)a=h-1;
P.forEach((p,i)=>p.inert=i!==a);P[a].classList.add('activa');ui();recorrido(P[a]);
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
