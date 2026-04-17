

'use client'

import styles from "./residVFalatianCasas3e4.module.css"
import { Bed, BedDoubleIcon, Bubbles, Building2, Car, ChefHat, ChevronLeft, ChevronRight, Leaf, MapPin, Sofa, SparklesIcon, Square, Sun, Toilet, Undo2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation"



type SlideItem = {
  image: string;
  icon: React.ElementType; // Lucide icons are components
  title: string;
  subtitle: string;
};


 const slideFachada: SlideItem[] = [
    {
      image: "/assets/fachadaCasa.webp",
      icon:  Car,
      title: "1 Vaga de Garagem Exclusiva",
      subtitle: "Garagem projetada para proporcionar acesso fácil e privativo, trazendo mais conforto para sua rotina e valorizando ainda mais o imóvel."
    },
    {
      image: "/assets/jardimCasa.webp",
      icon:  Leaf,
      title: "Beleza que acolhe",
      subtitle: "Um jardim planejado para transformar a entrada da casa em um cartão de boas-vindas. Transforma a chegada em experiência: leve, harmonioso e visualmente impecável."
    }
  ];

   const slideSala: SlideItem[]  = [
    {
      image: "/assets/salaCasa.webp",
      icon:  Sofa,
      title:"2 Salas que conectam os ambientes",
      subtitle: "Sala de estar e Sala de jantar integradas, que elevão a luz, amplitute e o conforto do seu lar!"
    },
    {
      image: "/assets/sala2Casa.webp",
      icon:  SparklesIcon,
      title: "Ambiente que Inspira",
      subtitle: "Um espaço elegante, moderno e naturalmente iluminado, pensado para destacar conforto e amplitude."
    }
  ];

     const slideQuartos: SlideItem[]  = [
    {
      image: "/assets/sala2Casa.webp",
      icon:  BedDoubleIcon,
      title:"2 quartos aconchegantes",
      subtitle: "Ambientes projetados para oferecer conforto, privacidade e tranquilidade. Perfeito para o descanso diário ou para criar um espaço íntimo de estudo ou trabalho."
    },
    {
      image: "/assets/quarto1Casa.webp",
      icon:  Bed,
      title:"Refúgio Convidativo",
      subtitle: "Um ambiente acolhedor, com excelente iluminação natural e janela ampla que valoriza a vista externa."
    },
    {
      image: "/assets/quarto2Casa.webp",
      icon:  Bed,
      title: "Espaço Versátil e Iluminado",
      subtitle: "Quarto com luz abundante e vista agradável. Perfeito para ser utilizado como dormitório principal, escritório ou espaço multifuncional."
    }
  ];

     const slideBanheiro: SlideItem[]  = [
    {
      image: "/assets/salaCasa.webp",
      icon:  Toilet,
      title:"1 Banheiro cuidadosamente planejado",
      subtitle: "Com box bem definido, pia moderna e prateleira em quartzo que eleva o acabamento. Cada detalhe pensado para entregar beleza, conforto e facilidade no uso diário."
    },
    {
      image: "/assets/sala2Casa.webp",
      icon:  Bubbles,
      title: "Design sofisticado",
      subtitle: "Este banheiro combina praticidade com sofisticação, criando um espaço agradável e valorizado."
    }
  ];



   const slideCozinha: SlideItem[]  = [
    {
      image: "/assets/cozinha1Casa.webp",
      icon:  ChefHat,
      title:"Elegância funcional no dia a dia",
      subtitle: "Ambiente moderno e harmonioso, com espaço gourmet completo. Pia de granito com cuba de inox!"
    },
    {
      image: "/assets/cozinha2Casa.webp",
      icon:  Sun,
      title: "Cozinha que Inspira Bem-Estar",
      subtitle: "Ambiente com iluminação natural e acabamentos de qualidade elevam cada detalhe do cotidiano."
    }
  ];


export default function ResidVFalatianCasas3e4(){

 
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

const IconFachada = currentFachada.icon;
const IconSala = currentSala.icon;
const IconQuartos = currentQuartos.icon
const IconBanheiro = currentBanheiro.icon
const IconCozinha = currentCozinha.icon

  const router = useRouter();
    const handleVoltarExec = () => {
    router.back();
    window.scrollTo(0, 0); // força rolagem para o topo
  };



  return (
    <div>


    <div className={styles.content}>
          <Image src={"/assets/capaBannerRVFalatian.webp"} className={styles.imageBanner} alt={""} width={1600} height={900}/>
            
      <div className={styles.divBtnsMenu2}>
        <Link className={styles.divBtnUndoV} href={""} onClick={() => handleVoltarExec()}>
          <Undo2 className={styles.btnUndoV}/>
          <span className={styles.textBtnUndoV}>Voltar</span>
        </Link>
      </div>


          <div className={styles.divTitleBlock}>
            <p className={styles.residencP}>Residencial</p>      
            <h2 className={styles.vFalatianTitle}>V-Falatian</h2>
          </div>
        </div>








      <div className={styles.containerEmExec}>
        <div>
        <div className={ styles.imagesVFalatian}>
          <div className={styles.imageAndText}>
            <iframe className={styles.imageApresentationResidSideLeft}src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7498.444358285374!2d-49.3393027693084!3d-25.385613911748017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce045800ed8a3%3A0x8e49e15addba2a3d!2sR.%20Renascen%C3%A7a%2C%20275%20-%20Santa%20Felicidade%2C%20Curitiba%20-%20PR%2C%2082410-110!5e1!3m2!1spt-BR!2sbr!4v1756854519803!5m2!1spt-BR!2sbr" width="700" height="450" style={{border: 0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            <div className={styles.secondGrid}>
              <h3 className={styles.descriptionImage}>Condomínio em excelente localização. Segurança, conforto, acessibilidade e localização estratégica.</h3>
              <div className={styles.iconAndText}><MapPin className={styles.icon}/> <p>Fazenda Rio Grande - PR</p></div>
            </div>
          </div>  

        


          <div className={styles.imageAndText}>
            <div className={styles.secondGridLeft}>
              <div>
              <div className={styles.iconAndTextLeft}></div>
                <h3 className={`${styles.descriptionImageFormatText} ${styles.textIntro}`}>Uma entrada que combina arquitetura moderna, iluminação precisa e um acolhimento pensado nos detalhes.</h3>
              </div>
              <div>
                <div className={styles.iconAndTextLeft}><IconFachada  className={styles.icon}/> <p>{currentFachada.title}</p></div>
                <h3 className={styles.descriptionImageFormatText}>{currentFachada.subtitle}</h3>
              </div>             
            </div>
            <Image src={currentFachada.image} className={styles.imageApresentationResidSideRight} alt={""} width={1536} height={1024}/>
            <ChevronLeft className={styles.arrowIconRLeft}  onClick={prevFachada}/>
            <ChevronRight className={styles.arrowIconRRight} onClick={nextFachada}/>            
          </div>  



          <div className={styles.imageAndText}>
            <Image src={currentSala.image} className={styles.imageApresentationResidSideLeft} alt={""} width={1252} height={392}/>
            <div className={styles.secondGrid}>
              <div className={styles.divThirdGridText}>
                <div className={styles.iconAndTextright}><div className={styles.iconsSala}><IconSala className={styles.icon}/></div><p className={styles.titleBlock}>{currentSala.title}</p></div>
                <h3 className={styles.descriptionImageFormatText}>{currentSala.subtitle}</h3>
              </div>   
            </div>
              <ChevronLeft className={styles.arrowIconLLeft}  onClick={prevSala}/>
              <ChevronRight className={styles.arrowIconLRight}  onClick={nextSala}/>
          </div>  


           <div className={styles.imageAndText}>
            <div className={styles.secondGridLeft}>
              <div>
                <div className={styles.iconAndTextLeft}><IconQuartos  className={styles.icon}/> <p>{currentQuartos.title}</p></div>
                <h3 className={styles.descriptionImageFormatText}>{currentQuartos.subtitle}</h3>
              </div>
            </div>
            <Image src={currentQuartos.image} className={styles.imageApresentationResidSideRight} alt={""} width={1536} height={1024}/>
            <ChevronLeft className={styles.arrowIconRLeft}  onClick={prevQuartos}/>
            <ChevronRight className={styles.arrowIconRRight} onClick={nextQuartos}/>  
          </div>  


          
              <div className={styles.imageAndText}>
            <Image src={currentSala.image} className={styles.imageApresentationResidSideLeft} alt={""} width={1252} height={392}/>
            <div className={styles.secondGrid}>
              <div className={styles.divThirdGridText}>
                <div className={styles.iconAndTextright}><div className={styles.iconsBanheiro}><IconBanheiro className={styles.icon}/></div><p className={styles.titleBlock}>{currentBanheiro.title}</p></div>
                <h3 className={styles.descriptionImageFormatText}>{currentBanheiro.subtitle}</h3>
              </div>   
            </div>
              <ChevronLeft className={styles.arrowIconLLeft}  onClick={prevBanheiro}/>
              <ChevronRight className={styles.arrowIconLRight}  onClick={nextBanheiro}/>
          </div>  





           <div className={styles.imageAndText}>
            <div className={styles.secondGridLeft}>
              
              <div>
                <div className={styles.iconAndTextLeft}><IconCozinha  className={styles.icon}/> <p>{currentCozinha.title}</p></div>
                <h3 className={styles.descriptionImageFormatText}>{currentCozinha.subtitle}</h3>
              </div>
            </div>
            <Image src={currentCozinha.image} className={styles.imageApresentationResidSideRight} alt={""} width={1536} height={1024}/>
            <ChevronLeft className={styles.arrowIconRLeft}  onClick={prevCozinha}/>
            <ChevronRight className={styles.arrowIconRRight} onClick={nextCozinha}/>  
          </div>  










         <div className={styles.imageAndText}>
            <div className={styles.secondGridLeft}>
              <div>
                <div className={styles.iconAndTextLeft}><Building2 className={styles.icon}/> <p>57 m<sup className={styles.numberTwoSup}>2</sup> de área construída</p></div>
                <h3 className={styles.descriptionImageFormatText}>Ambientes amplos e modernos, que combinam sofisticação e funcionalidade, pensados para sua comodidade e qualidade de vida.</h3>
              </div>
              <div>
              <div className={styles.iconAndTextLeft}><Square  className={styles.icon}/> <p>126 m<sup className={styles.numberTwoSup}>2</sup> de área total</p></div>
                <h3 className={styles.descriptionImageFormatText}>Ampla área total com jardim e quintal, perfeita para aproveitar momentos ao ar livre, relaxar ou se divertir, do jeito que você quiser!</h3>
              </div>
            </div>
            <Image src={"/assets/imgemMedidaConstrução.png"} className={styles.imageApresentationResidSideRight} alt={""} width={1252} height={392}/>
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
              <button className={styles.btnCta}>Agendar Visita</button>
            </div>
          </div> 
   </div>
  )
}