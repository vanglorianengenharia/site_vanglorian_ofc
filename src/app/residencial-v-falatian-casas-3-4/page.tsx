'use client'

import styles from "./residVFalatianCasa1e2.module.css"
import { Bed, BedDoubleIcon, Bubbles, Building2, Car, ChefHat, ChevronLeft, ChevronRight, Flame, Flower2Icon, GraduationCap, HeartPulse, Leaf, MapPin, MoveUpRight, PawPrint, ShoppingCart, ShowerHead, SoapDispenserDroplet, Sofa, SparklesIcon, Square, Sun, Toilet, Undo2, UtensilsCrossed } from "lucide-react"
import Image from "next/image"
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation"


type SlideItem = {
  image: string;
  icon: React.ElementType;
  title: string;
  topics: string[];
};
 const slideFachada: SlideItem[] = [
    {
      image: "/assets/entrada-garagem-01.png",
      icon:  Car,
      title: "2 Vagas de Garagem",
      topics: [
        "2 vagas de garagem exclusiva",
        "Acesso fácil e privativo",
        "Entrada com arquitetura moderna, iluminação precisa e acolhimento pensado nos detalhes"
      ]
    },
    {
      image: "/assets/garagemJardim2.jpg",
      icon:  Leaf,
      title: "Beleza que Acolhe", 
      topics: [
        "2 vagas de garagem exclusiva",
        "Acesso fácil e privativo",
        "Entrada com arquitetura moderna, iluminação precisa e acolhimento pensado nos detalhes"
      ]
    }
  ];

   const slideSala: SlideItem[]  = [
    {
      image: "/assets/salaCasa.png",
      icon:  Sofa,
      title:"2 Salas que Conectam",

      topics: [
        "2 salas integradas (estar e jantar)",
        "Luz natural abundante",
        "Amplitude e conforto",    
]
    },
    {
      image: "/assets/salaCasa2.png",
      icon:  SparklesIcon,
      title: "Ambiente que Inspira",
      topics: [
        "Design elegante e moderno",
        "Detalhes pensados para o seu bem-estar"
]
    }
  ];

     const slideQuartos: SlideItem[]  = [
    {
      image: "/assets/sala2Casa2.png",
      icon:  BedDoubleIcon,
      title:"2 Quartos Aconchegantes",
      topics: [
        "2 quartos aconchegantes",
        "Conforto, privacidade e tranquilidade",
        "Iluminação natural abundante",
    ]
    },
    {
      image: "/assets/quartosQ1.jpg",
      icon:  Bed,
      title:"Refúgio Convidativo",
     topics: [
        "Janela ampla com vista valorizada",
        "Ideal para descanso, estudo ou home office",
        "Amplo espaço para personalização"
      ]
    },
    {
      image: "/assets/quartos-visao-geral-01.png",
      icon:  Bed,
      title:"Refúgio Convidativo",
      topics: [
      "Espaço versátil e multifuncional",
      "Piso laminado de alto padrão",
      "Vista para área verde pela janela",
    ]
    },
    {
      image: "/assets/quartosQ2.jpg",
      icon:  Bed,
      title: "Espaço Versátil e Iluminado",
      topics: [
      "2 quartos aconchegantes",
      "Vista para área verde pela janela",
      "Iluminação natural abundante",
]
    }
  ];
     const slideBanheiro: SlideItem[]  = [
    {
      image: "/assets/banheiro2Casa2.png",
      icon:  Toilet,
      title:"1 Banheiro Planejado",
      topics: [
      "Box com prateleira nicho, em Quartzo Branco",
      "Lavatório em mármore branco Paraná",
      "Revestimento premium retificado nas paredes",
  ]
    },
    {
      image: "/assets/banheiro1Casa.jpg",
      icon:  ShowerHead,
      title: "Design Sofisticado",
      topics: [
      "Janela para ventilação natural",
      "Detalhes em gesso no teto",
      "Layout planejado para conforto e funcionalidade"
  ]
    }
  ];
   const slideCozinha: SlideItem[]  = [
    {
      image: "/assets/cozinha-completa-01.png",
      icon:  ChefHat,
      title:"Elegância Funcional no Dia a Dia",
      topics: [
        "Cozinha independente",
        "Fácil integração à sala de jantar",
        "Com revestimento premium",
        "Porta de vidro com acesso ao quintal"
      ]
    },
    {
      image: "/assets/cozinha2Casa.jpg",
      icon:  Sun,
      title: "Cozinha que Inspira Bem-Estar",
      topics: [
        "Janela ampla com iluminação natural",
        "Integração com área externa",
        "Piso acetinado extra-grande",
        "Acabamentos de qualidade em cada detalhe"
      ]
    }
  ];
     const slideAreaGourmet: SlideItem[]  = [
    {
      image: "/assets/areaGourmet1Casa.png",
      icon:  Flame,
      title:"Área Gourmet Completa",
      topics: [
        "Churrasqueira em alvenaria com acabamento premium",
        "Cuba em inox embutida com torneira cromada instalada",
        "Bancada em granito escuro"
      ]
    },
    {
      image: "/assets/areaGourmet2Casa2.png",
      icon:  UtensilsCrossed,
      title: "Praticidade e Convivência",
      topics: [
        "Acabamento de alto padrão",
        "Ambiente externo com céu aberto",
        "Gramado integrado ao espaço"
      ]
    }
  ];
       const slideLavanderia: SlideItem[]  = [
    {
      image: "/assets/lavanderia1Casa1.png",
      icon:  SoapDispenserDroplet,
      title:"Área de Serviço",
       topics: [
        "Área de serviço privativa",
        "Espaço amplo e de fácil manutenção",
        "Tanque instalado com torneira"
      ]
    },
    {
      image: "/assets/lavanderia2Casa.jpg",
      icon:  Bubbles,
      title: "Privacidade e Comodidade",
       topics: [
        "Área de serviço privativa",
        "Espaço amplo e de fácil manutenção",
        "Tanque instalado com torneira"
      ]
    }
  ];


export default function ResidVFalatianCasa1e2(){
function useSlide<T>(slides: T[]) {
  const [index, setIndex] = useState<number>(0);
  const next = () => setIndex(i => (i + 1) % slides.length);
  const prev = () => setIndex(i => (i - 1 + slides.length) % slides.length);
  const current = slides[index];
  return { current, next, prev, index };
}

const { current: currentFachada, next: nextFachada, prev: prevFachada } = useSlide<SlideItem>(slideFachada);
const { current: currentSala, next: nextSala, prev: prevSala } = useSlide<SlideItem>(slideSala);
const { current: currentQuartos, next: nextQuartos, prev: prevQuartos } = useSlide<SlideItem>(slideQuartos);
const { current: currentBanheiro, next: nextBanheiro, prev: prevBanheiro } = useSlide<SlideItem>(slideBanheiro);
const { current: currentCozinha, next: nextCozinha, prev: prevCozinha } = useSlide<SlideItem>(slideCozinha);
const { current: currentAreaGourmet, next: nextAreaGourmet, prev: prevAreaGourmet } = useSlide<SlideItem>(slideAreaGourmet);
const { current: currentLavanderia, next: nextLavanderia, prev: prevLavanderia } = useSlide<SlideItem>(slideLavanderia);

const IconFachada = currentFachada.icon;
const IconSala = currentSala.icon;
const IconQuartos = currentQuartos.icon
const IconBanheiro = currentBanheiro.icon
const IconCozinha = currentCozinha.icon
const IconAreaGourmet = currentAreaGourmet.icon
const IconLavanderia = currentLavanderia.icon

  const router = useRouter();
    const handleVoltarExec = () => {
      router.push("/");
  };

    const phoneNumber = '+554191459026'; 
    const handleClickTalkWithUs = () => {
    const whatsappLink = `https://wa.me/${phoneNumber}?text=Olá!%20Gostei%20do%20%20residencial%20V-Falatian%20e%20gostaria%20de%20agendar%20uma%20visita.`;
    window.open(whatsappLink, '_blank'); 
  }
  return (
    <div className={styles.containerResidVFalatian}>
    <div className={styles.content}>
      <div className={styles.divBtnsMenu2}>
        <button className={styles.divBtnUndoV} onClick={() => handleVoltarExec()}>
          <Undo2 className={styles.btnUndoV}/>
          <span className={styles.textBtnUndoV}>Voltar</span>
        </button>
      </div>
          <div className={styles.divTitleBlocksComodos}>
            <h3 className={styles.titleBlocksComodos}>Um Passeio Pelo<br />Seu novo Lar</h3>
          </div> 
          <div className={styles.containerComodos}>

           <div className={styles.imageAndText}>
            <div className={styles.secondGridLeft}>
              <div className={styles.tituloLocal}><p className={styles.tituloLocal1}>Entrada</p><p className={styles.tituloLocal2}>do lar</p></div>
              <div className={styles.grupoTexto}>
                <div className={styles.iconAndTextLeft}><IconFachada  className={styles.icon}/> <p className={styles.titleCaracteristica}>{currentFachada.title}</p></div>
                <ul className={styles.descriptionImageFormatText}>
                  {currentFachada.topics.map((topic, i) => (
                    <li key={i} className={styles.dotTextLi}><span className={styles.dotIconSpan}>•</span> {topic}</li>
                  ))}
                </ul>
              </div>             
            </div>
            <Image src={currentFachada.image} className={styles.imageApresentationResidSideRight} alt={""} width={1536} height={1024}/>
            <ChevronLeft className={styles.arrowIconRLeft}  onClick={prevFachada}/>
            <ChevronRight className={styles.arrowIconRRight} onClick={nextFachada}/>            
          </div>  
          <div className={`${styles.imageAndText} ${styles.imageAndTextImageRight}`}>
            <Image src={currentSala.image} className={styles.imageApresentationResidSideLeft} alt={""} width={1252} height={392}/>
            <div className={styles.secondGrid}>
              <div className={styles.divThirdGridText}>
                <div className={styles.tituloLocalLeft}><p className={styles.tituloLocal1}>Sala de</p><p className={styles.tituloLocal2}>Estar e Jantar</p></div>      
                  <div className={styles.grupoTexto2}>
                    <div className={styles.iconAndTextright}><div className={styles.iconsSala}><IconSala className={styles.icon}/></div><p className={styles.titleBlock}>{currentSala.title}</p></div>
                      <ul className={styles.descriptionImageFormatText}>
                        {currentSala.topics.map((topic, i) => (
                    <li key={i} className={styles.dotTextLi}><span className={styles.dotIconSpan}>•</span> {topic}</li>
                  ))}
                </ul>   
                  </div>         
               </div>   
            </div>
              <ChevronLeft className={styles.arrowIconLLeft}  onClick={prevSala}/>
              <ChevronRight className={styles.arrowIconLRight}  onClick={nextSala}/>
          </div>  
           <div className={styles.imageAndText}>
            <div className={styles.secondGridLeft}>
              <div className={styles.tituloLocal}><p className={styles.tituloLocal1}>Quartos</p><p className={styles.tituloLocal2}>Área íntima</p></div>
              <div  className={styles.grupoTexto}>
                <div className={styles.iconAndTextLeft}><IconQuartos  className={styles.icon}/> <p className={styles.titleCaracteristica}>{currentQuartos.title}</p></div>
                  <ul className={styles.descriptionImageFormatText}>
                  {currentQuartos.topics.map((topic, i) => (
                    <li key={i} className={styles.dotTextLi}><span className={styles.dotIconSpan}>•</span> {topic}</li>
                  ))}
                </ul>
              </div>

            </div>
            <Image src={currentQuartos.image} className={styles.imageApresentationResidSideRight} alt={""} width={1536} height={1024}/>
            <ChevronLeft className={styles.arrowIconRLeft}  onClick={prevQuartos}/>
            <ChevronRight className={styles.arrowIconRRight} onClick={nextQuartos}/>  
          </div>  
          <div className={styles.imageAndText}>
            <Image src={currentBanheiro.image} className={styles.imageApresentationResidSideLeft} alt={""} width={1252} height={392}/>
            <div className={styles.secondGrid}>
              <div className={styles.divThirdGridText}>
              <div className={styles.tituloLocalLeft}><p className={styles.tituloLocal1}>Banheiro</p><p className={styles.tituloLocal2}>Social</p></div>

                <div className={styles.iconAndTextright}><div className={styles.iconsBanheiro}><IconBanheiro className={styles.icon}/></div><p className={styles.titleBlock}>{currentBanheiro.title}</p></div>
                  <ul className={styles.descriptionImageFormatText}>
                  {currentBanheiro.topics.map((topic, i) => (
                    <li key={i} className={styles.dotTextLi}><span className={styles.dotIconSpan}>•</span> {topic}</li>
                  ))}
                </ul>
              </div>   
            </div>
              <ChevronLeft className={styles.arrowIconLLeft}  onClick={prevBanheiro}/>
              <ChevronRight className={styles.arrowIconLRight}  onClick={nextBanheiro}/>
          </div>  
           <div className={styles.imageAndText}>
            <div className={styles.secondGridLeft}>
              <div className={styles.tituloLocal}><p className={styles.tituloLocal1}>Cozinha</p><p className={styles.tituloLocal2}>Funcional</p></div>
              <div  className={styles.grupoTexto}>
                <div className={styles.iconAndTextLeft}><IconCozinha  className={styles.icon}/> <p className={styles.titleCaracteristica}>{currentCozinha.title}</p></div>
                  <ul className={styles.descriptionImageFormatText}>
                  {currentCozinha.topics.map((topic, i) => (
                    <li key={i} className={styles.dotTextLi}><span className={styles.dotIconSpan}>•</span> {topic}</li>
                  ))}
                </ul>
              </div>
            </div>
            <Image src={currentCozinha.image} className={styles.imageApresentationResidSideRight} alt={""} width={1536} height={1024}/>
            <ChevronLeft className={styles.arrowIconRLeft}  onClick={prevCozinha}/>
            <ChevronRight className={styles.arrowIconRRight} onClick={nextCozinha}/>  
          </div>  
          <div className={styles.imageAndText}>
            <Image src={currentAreaGourmet .image} className={styles.imageApresentationResidSideLeft} alt={""} width={1252} height={392}/>
            <div className={styles.secondGrid}>
              <div className={styles.divThirdGridText}>
              <div className={styles.tituloLocalLeft}><p className={styles.tituloLocal1}>Espaço</p><p className={styles.tituloLocal2}>gourmet</p></div>

                <div className={styles.iconAndTextright}><div className={styles.iconsAreaGourmet }><IconAreaGourmet  className={styles.icon}/></div><p className={styles.titleBlock}>{currentAreaGourmet .title}</p></div>
                  <ul className={styles.descriptionImageFormatText}>
                  {currentAreaGourmet.topics.map((topic, i) => (
                    <li key={i} className={styles.dotTextLi}><span className={styles.dotIconSpan}>•</span> {topic}</li>
                  ))}
                </ul>
              </div>   
            </div>
              <ChevronLeft className={styles.arrowIconLLeft}  onClick={prevAreaGourmet }/>
              <ChevronRight className={styles.arrowIconLRight}  onClick={nextAreaGourmet }/>
          </div>  
           <div className={styles.imageAndText}>
            <div className={styles.secondGridLeft}>
              <div className={styles.tituloLocal}><p className={styles.tituloLocal1}>Lavanderia</p><p className={styles.tituloLocal2}>Separada</p></div>
              <div  className={styles.grupoTexto}>
                <div className={styles.iconAndTextLeft}><IconLavanderia  className={styles.icon}/> <p className={styles.titleCaracteristica}>{currentLavanderia.title}</p></div>
                  <ul className={styles.descriptionImageFormatText}>
                  {currentLavanderia.topics.map((topic, i) => (
                    <li key={i} className={styles.dotTextLi}><span className={styles.dotIconSpan}>•</span> {topic}</li>
                  ))}
                </ul>
              </div>
            </div>
            <Image src={currentLavanderia.image} className={styles.imageApresentationResidSideRight} alt={""} width={1536} height={1024}/>
            <ChevronLeft className={styles.arrowIconRLeft}  onClick={prevLavanderia}/>
            <ChevronRight className={styles.arrowIconRRight} onClick={nextLavanderia}/>  
          </div>  
          </div> 
        </div>
    <div className={styles.divIntroInfoContent}>
        <div className={styles.divIntroInfo}>
          <div className={styles.listIntroInfo}><Square  className={styles.iconIntro}/> <h5 className={styles.listIntroInfoText}>126 m<sup className={styles.numberTwoSup}>2</sup> de área total</h5></div>
          <div className={styles.listIntroInfo}><Building2 className={styles.icon}/> <h5 className={styles.listIntroInfoText}>57 m<sup className={styles.numberTwoSup}>2</sup> de área construída</h5></div>
          <div className={styles.listIntroInfo}><BedDoubleIcon className={styles.icon}/> <h5 className={styles.listIntroInfoText}>2 quartos</h5></div>
          <div className={styles.listIntroInfo}><Toilet className={styles.icon}/> <h5 className={styles.listIntroInfoText}>1 banheiro</h5></div>
          <div className={styles.listIntroInfo}><Car className={styles.icon}/> <h5 className={styles.listIntroInfoText}>2 vagas</h5></div>
          <div className={styles.listIntroInfo}><Flower2Icon className={styles.icon}/> <h5 className={styles.listIntroInfoText}>Jardim</h5></div>
       </div>
    </div>
    <div className={styles.containerEmExec}>  
      <div className={styles.containerInfoCasa}>
        <div className={ styles.imagesVFalatian}>  
          <div  className={styles.locationContainer}>
            <div className={styles.divLocation}>
              <div className={styles.locationText}>
                <h3 className={`${styles.locationTitle} ${styles.localizacaoTextTitle}`}>Localização</h3>
                <div className={styles.iconAndTextLocation}>
                  <p className={styles.detailsTextBLocation}>Bairro Veneza - Fazenda Rio Grande / PR</p>
                </div>
                <div className={styles.iconAndTextLocation}>
                  <MapPin className={styles.iconMap}/> 
                  <p className={styles.detailsTextLocation}>Tudo o que você precisa no dia a dia, a poucos minutos.</p>
                </div>
                <div className={styles.iconAndTextLocationBtn}>
                  <div className={styles.btnRotas}>
                    <Link className={styles.detailsTextLocationBtn} href={"https://www.google.com/maps/dir//R.+Osvaldo+Falat+Fazenda+Rio+Grande+-+PR/@-25.6927642,-49.2952732,17z/data=!4m5!4m4!1m0!1m2!1m1!1s0x94dc55cd3a812f9f:0x5440fe1d096e06e2"} target="_blank">Ver rotas no Google Maps</Link>
                    <MoveUpRight className={styles.iconArrow}/> 
                  </div>
              </div>
            </div>
            <iframe className={styles.locGoogleMaps}src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2181.554781446294!2d-49.295972139349296!3d-25.69276419833446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dc55cd3a812f9f%3A0x5440fe1d096e06e2!2sR.%20Osvaldo%20Falat%2C%20Fazenda%20Rio%20Grande%20-%20PR!5e1!3m2!1spt-BR!2sbr!4v1767741140698!5m2!1spt-BR!2sbr" style={{border: 0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>  
          <div  className={styles.comodProxContainer}>
            <h3 className={`${styles.locationTitle} ${styles.comodidadesProxTitle}`}>Comodidades Próximas</h3>
            <div className={styles.comodidadesContainer}>
              <div className={styles.comodidadesCategorias}>
                <span  className={styles.comodidadesCategoriasSpan}><ShoppingCart />Compras & Serviços</span>
                <p className={styles.comodidadesCategoriasText}>Supermercado Condor -  3 km</p>
                <p className={styles.comodidadesCategoriasText}>Mercados e lanchonetes - 1,6 km</p>
              </div>
              <div className={styles.comodidadesCategorias}>
                <span className={styles.comodidadesCategoriasSpan}><GraduationCap/>Educação</span>
                <p className={styles.comodidadesCategoriasText}>Escolas - Aprox. 2,4 km</p>
              </div>
              <div className={styles.comodidadesCategorias}>
                <span className={styles.comodidadesCategoriasSpan}><HeartPulse />Saúde</span>
                <p className={styles.comodidadesCategoriasText}>UBS -  3km</p>
                <p className={styles.comodidadesCategoriasText}>Farmácia - 2,3 km</p>
              </div>
              <div className={styles.comodidadesCategorias}>
                <span className={styles.comodidadesCategoriasSpan}><PawPrint/>Pet</span>
                <p className={styles.comodidadesCategoriasText}>Pet shop - 1,6 km</p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div> 
      </div> 
          <div className={styles.divTextCtaEBtn}>
            <div className={styles.divText}>
              <p className={styles.textCta1}>Gostou do que viu?</p>
              <p className={styles.textCta2}>Agende uma visita exclusiva e conheça seu novo lar.</p>
            </div>
            <div className={styles.divBtn}>
              <button className={styles.btnCta} onClick={handleClickTalkWithUs}>Agendar Visita</button>
            </div>
          </div> 
<div>
</div>
</div>
  )
}