import {
  BedDouble,
  Bubbles,
  Car,
  ChefHat,
  Flame,
  House,
  ShowerHead,
  SoapDispenserDroplet,
  Sofa,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

export type ConstructionSlide = {
  image: string;
  icon: LucideIcon;
  title: string;
  topics: string[];
};

export type ConstructionRoom = {
  room: string;
  detail: string;
  displayName: string;
  slides: ConstructionSlide[];
};

// Imagens temporárias: substitua somente os caminhos abaixo quando as
// fotografias reais das Casas 1 e 2 estiverem disponíveis.
const temporaryImages = {
  entrance: ["/assets/entrada-garagem-01.webp", "/assets/entrada-jardim-02.webp"],
  living: ["/assets/salaCasa.webp", "/assets/sala-visao-interna-02.webp"],
  bedrooms: ["/assets/quartos-visao-sala-01.webp", "/assets/quartos-visao-interna-03.webp"],
  bathroom: ["/assets/banheiro-visao-geral-01.webp", "/assets/banheiro-vista-porta-02.webp"],
  kitchen: ["/assets/cozinha-completa-01.webp", "/assets/cozinha-iluminada-02.webp"],
  gourmet: ["/assets/espaco-gourmet-completa-01.webp", "/assets/espaco-gourmet-visao-frente-02.webp"],
  laundry: ["/assets/lavanderia-visao-geral-01.webp", "/assets/lavanderia-visao-interna-02.webp"],
} as const;

export const constructionRooms: ConstructionRoom[] = [
  {
    room: "Entrada",
    detail: "do lar",
    displayName: "Entrada",
    slides: [
      {
        image: temporaryImages.entrance[0],
        icon: Car,
        title: "Acesso e garagem em execução",
        topics: [
          "Entrada e garagem previstas no projeto",
          "A configuração final será apresentada conforme o avanço da obra",
          "Execução acompanhada etapa por etapa",
        ],
      },
      {
        image: temporaryImages.entrance[1],
        icon: House,
        title: "A chegada começa a ganhar forma",
        topics: [
          "Acesso residencial em construção",
          "Elementos finais serão detalhados após a conclusão desta etapa",
        ],
      },
    ],
  },
  {
    room: "Sala",
    detail: "de estar e jantar",
    displayName: "Sala",
    slides: [
      {
        image: temporaryImages.living[0],
        icon: Sofa,
        title: "Ambiente social em construção",
        topics: [
          "Espaço destinado às salas de estar e jantar",
          "Organização pensada para convivência e conforto",
          "Detalhes finais serão apresentados durante a evolução da obra",
        ],
      },
      {
        image: temporaryImages.living[1],
        icon: House,
        title: "O centro de convivência do lar",
        topics: [
          "Ambiente social previsto no projeto",
          "Integração visual com a cozinha através do passa-prato",
        ],
      },
    ],
  },
  {
    room: "Quartos",
    detail: "área íntima",
    displayName: "Quartos",
    slides: [
      {
        image: temporaryImages.bedrooms[0],
        icon: BedDouble,
        title: "3 quartos em construção",
        topics: [
          "Três quartos previstos no projeto",
          "Área íntima destinada ao descanso e à privacidade",
          "Acabamentos serão apresentados conforme a execução avançar",
        ],
      },
      {
        image: temporaryImages.bedrooms[1],
        icon: BedDouble,
        title: "Espaços para diferentes momentos",
        topics: [
          "Ambientes versáteis para a rotina da família",
          "Configuração final em desenvolvimento",
        ],
      },
    ],
  },
  {
    room: "Banheiro",
    detail: "social",
    displayName: "Banheiro",
    slides: [
      {
        image: temporaryImages.bathroom[0],
        icon: ShowerHead,
        title: "Banheiro social em execução",
        topics: [
          "Banheiro social previsto no projeto",
          "Instalações e acabamentos serão registrados ao longo da obra",
          "Informações finais serão atualizadas após a execução",
        ],
      },
      {
        image: temporaryImages.bathroom[1],
        icon: ShowerHead,
        title: "Funcionalidade em cada etapa",
        topics: [
          "Ambiente planejado para o uso cotidiano",
          "Detalhes de execução serão apresentados quando confirmados",
        ],
      },
    ],
  },
  {
    room: "Cozinha",
    detail: "funcional",
    displayName: "Cozinha",
    slides: [
      {
        image: temporaryImages.kitchen[0],
        icon: ChefHat,
        title: "Cozinha funcional com passa-prato",
        topics: [
          "Cozinha separada da sala por passa-prato",
          "Integração visual e praticidade sem eliminar a definição entre os ambientes",
          "Espaço funcional previsto para a rotina da casa",
        ],
      },
      {
        image: temporaryImages.kitchen[1],
        icon: UtensilsCrossed,
        title: "Conexão visual, ambientes definidos",
        topics: [
          "Abertura horizontal entre sala e cozinha",
          "Solução que favorece a comunicação entre os ambientes",
          "Acabamentos ainda em execução",
        ],
      },
    ],
  },
  {
    room: "Espaço",
    detail: "gourmet",
    displayName: "Espaço gourmet",
    slides: [
      {
        image: temporaryImages.gourmet[0],
        icon: Flame,
        title: "Espaço gourmet em construção",
        topics: [
          "Área gourmet prevista no projeto",
          "Ambiente destinado à convivência e aos encontros",
          "Detalhes finais serão apresentados conforme a obra evoluir",
        ],
      },
      {
        image: temporaryImages.gourmet[1],
        icon: UtensilsCrossed,
        title: "Um espaço pensado para reunir",
        topics: [
          "Área de convivência em execução",
          "Configuração final será atualizada com dados confirmados",
        ],
      },
    ],
  },
  {
    room: "Lavanderia",
    detail: "separada",
    displayName: "Lavanderia",
    slides: [
      {
        image: temporaryImages.laundry[0],
        icon: SoapDispenserDroplet,
        title: "Lavanderia em execução",
        topics: [
          "Lavanderia prevista no projeto",
          "Espaço destinado à organização da rotina doméstica",
          "Instalações e acabamentos ainda serão atualizados",
        ],
      },
      {
        image: temporaryImages.laundry[1],
        icon: Bubbles,
        title: "Praticidade para o dia a dia",
        topics: [
          "Ambiente funcional em construção",
          "Detalhes finais serão apresentados quando confirmados",
        ],
      },
    ],
  },
];

export const constructionStages = [
  "Fundação",
  "Estrutura",
  "Alvenaria",
  "Cobertura",
  "Instalações",
  "Acabamentos",
  "Entrega",
] as const;

