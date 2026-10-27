/* Navegación, gestos y glosario. ir() es global porque los botones del HTML la invocan. */
const glosario={
"ADN":"Ácido desoxirribonucleico. Molécula que guarda las instrucciones para construir y operar un organismo.",
"genes":"Tramos del ADN con instrucciones para una función concreta, como producir una proteína.",
"epigenética":"Estudio de los cambios en la actividad de los genes que no modifican la secuencia del ADN.",
"metilación del ADN":"Grupo CH₃ que se añade al ADN. En este proyecto suele asociarse a menor actividad del gen; no es una ley de este dataset.",
"chip 450k":"Lector que mide la metilación en cientos de miles de sitios de una muestra de sangre. En este proyecto es el único chip del que aprende el modelo. El chip más nuevo queda fuera.",
"fenotipo":"En este trabajo es la etiqueta clínica de la fila, SCZ o CNT. El gsm_id la alinea con los betas de esa muestra.",
"esquizofrenia":"Trastorno mental grave que afecta el pensamiento, la percepción y el comportamiento.",
"biomarcadores":"Indicadores biológicos medibles que ayudan a identificar una enfermedad de forma objetiva.",
"firma epigenética":"Patrón de sitios CpG que se compara entre los dos grupos. Importa el conjunto, no una marca aislada ni una dirección global de metilación.",
"sangre periférica":"Sangre que circula por el cuerpo y se obtiene con una extracción común.",
"NCBI GEO":"Repositorio público de EE. UU. con datos de miles de estudios genómicos.",
"armonizarse":"Pone en la misma escala las lecturas de laboratorios distintos, sin mirar el diagnóstico. Aquí usa un estudio como referencia. No es el filtro de varianza ni la normalización previa: evita confundir el laboratorio con la enfermedad.",
"armoniza":"Pone en la misma escala las lecturas de laboratorios distintos, sin mirar el diagnóstico. Aquí usa un estudio como referencia. No es el filtro de varianza ni la normalización previa: evita confundir el laboratorio con la enfermedad.",
"cohorte":"Un grupo de personas medidas juntas, en un mismo laboratorio. Cada estudio que entra al archivo es una cohorte. Importa porque el modelo debe aprender la enfermedad y no la costumbre de un solo laboratorio.",
"modelo supervisado":"Algoritmo que aprende a clasificar a partir de ejemplos con respuesta conocida.",
"AUC-ROC":"Ordena casos frente a controles: 0,50 es el azar y 1 el orden perfecto. Muestra si el modelo separa mejor que el azar, antes de fijar un corte de sí o no.",
"F1":"Mide el equilibrio al asignar la clase: acierta los casos sin llenar de falsas alarmas. Se puede ordenar bien y, aun así, equivocar la etiqueta.",
"validación cruzada":"Técnica que divide los datos en partes y rota cuál se usa para evaluar, para no medir con lo ya visto.",
"LOGO":"Se entrena sin un estudio y se examina con ese estudio entero: lo más parecido a un laboratorio nuevo. Aquí cae cerca del azar, porque el patrón no viaja entre cohortes. Por eso el módulo es investigación, no diagnóstico.",
"plataforma web":"Aplicación a la que se entra desde un navegador, sin instalar nada. Aquí se construyó sobre PERASArc (Django y Vue.js).",
"CSV armonizado":"Tabla que llega ya en la misma escala que el entrenamiento. La página no repite el laboratorio ni vuelve a entrenar. El visitante consulta un modelo fijo, no lanza un análisis nuevo.",
"valor beta":"Número entre 0 y 1: qué tan metilado está un sitio en una muestra. Es la celda de la matriz.",
"sitio CpG":"Columna cg… del chip. El modelo no mira un gen: mira miles de estas columnas.",
"gsm_id":"Identificador que alinea, en la misma persona, la etiqueta clínica y sus valores de metilación. Si falla ese enlace, el modelo aprende con la fila equivocada.",
"regRCPqn":"Pone en la misma escala las lecturas de laboratorios distintos, sin mirar el diagnóstico. Aquí usa un estudio como referencia. No es el filtro de varianza ni la normalización previa: evita confundir el laboratorio con la enfermedad.",
"panel congelado":"Lista fija de sitios con la que el modelo ya quedó entrenado. Se cierra una vez y la página solo la aplica. Importa porque la web no vuelve a elegir sitios.",
"holdout":"Grupo apartado desde el principio: no elige el modelo ni sus ajustes, y se mira una sola vez. El laboratorio lo reservó como segunda opinión en los mismos estudios. No prueba un hospital nuevo.",
"selección dentro del pliegue":"Se eligen los sitios que mejor separan casos y controles, solo con el entrenamiento de ese pliegue, nunca con el examen. Mirarlo inflaría el resultado. Mann-Whitney puntúa la separación y SelectKBest guarda los mejores.",
"camino A/B":"Dos entregas del mismo panel. Una resta medidas que acompañan a la persona; la otra usa solo la metilación y es la que abre el formulario. No son el mismo archivo recortado.",
"camino A":"Entrega en la que el modelo resta, de la metilación, el efecto de otras medidas de la persona. Esas medidas no son columnas extra del clasificador. Sirve para ver si el patrón sigue ahí después de la corrección.",
"camino B":"Entrega que usa solo el panel de metilación, sin esa corrección. El formulario abre aquí. No es un recorte del camino A: es otro modelo, para ver el patrón a solas.",
"joblib":"Archivo con el modelo ya entrenado. La plataforma lo carga para calcular la clase y p_scz; no reentrena.",
"covariables":"Datos que acompañan a la metilación: sexo, edad epigenética, humo y fracciones de células. En el camino A el joblib las usa para residualizar. No entran como columnas extra del clasificador.",
"dasen":"Normalización del laboratorio, en R, que deja comparables las lecturas del chip 450k. Es anterior al entrenamiento de este trabajo.",
"BMIQ":"Ajuste del laboratorio, en R, que corrige el sesgo entre los dos tipos de sonda del chip. Va junto a dasen, antes de mezclar los estudios.",
"EpiDISH":"Cálculo en R de las fracciones de células de la sangre. El laboratorio lo hace antes de mezclar los estudios.",
"EpiSmokEr":"Cálculo en R de la exposición al humo a partir de la metilación. También ocurre antes de mezclar.",
"methylclock":"Cálculo en R de la edad epigenética, después de regRCPqn. Esa edad es una de las nueve covariables del camino A.",
"ComBat":"Ajuste de diferencias entre estudios. El laboratorio lo aplica después, junto con la partición 80/20. La página no lo ejecuta.",
"CV anidada":"El entrenamiento se parte en estudiar y examinar. Fuera se mide el desempeño; dentro se eligen los sitios y los ajustes. El modelo no se califica con las personas con las que se afinó.",
"p_scz":"Probabilidad de la clase SCZ. La página muestra esa probabilidad y la clase SCZ o CNT, con el aviso: «Herramienta de investigación; no constituye diagnóstico clínico.»",
"smoking_SSc":"Puntaje de humo estimado por EpiSmokEr desde la propia metilación. En el camino A se residualiza, y al restarlo se quita señal que venía del chip.",
"edad epigenética":"Edad estimada por methylclock a partir de la metilación, no la edad de calendario. Es una de las nueve covariables del camino A.",
"sondas ch.":"Sondas del chip hechas para otra química, no para los sitios de metilación de este trabajo. Se quitan antes de cerrar el panel. Así el modelo no aprende de una señal que no le corresponde.",
"Mann-Whitney":"Puntúa qué tan bien un sitio separa casos y controles, sin suponer una sola dirección de metilación. En cada pliegue mira solo el entrenamiento, y SelectKBest se queda con los mejores.",
"Platt":"Calibración que pasa la distancia a la frontera de la SVM a una probabilidad. Así la página puede decir qué tan probable es la clase, no solo de qué lado cayó."};

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
