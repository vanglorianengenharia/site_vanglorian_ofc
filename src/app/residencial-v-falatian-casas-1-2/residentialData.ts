import {
  BedDouble,
  Bubbles,
  Car,
  House,
  RouteIcon,
  ShowerHead,
  SoapDispenserDroplet,
  Sofa,
  SproutIcon,
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
  entrance: ["/assets/vfalatian-casas-1e2-entrada-01.webp", "/assets/vfalatian-1e2-entrada-02.webp"],
  living: ["/assets/vfalatian-casas-1e2-area-social-01.webp", "/assets/vfalatian-1e2-area-social-02.webp"],
  hall: ["/assets/vfalatian-casas-1e2-hall-00.webp", "/assets/vfalatian-casas-1e2-hall-02.webp"],
  bathroom: ["/assets/vfalatian-1e2-banheiro-01.webp", "/assets/vfalatian-1e2-banheiro-02.webp"],
  bedrooms: ["/assets/vfalatian-casas-1e2-quarto-01.webp", "/assets/vfalatian-casas-1e2-quarto-02.webp", "/assets/vfalatian-casas-1e2-quarto-03.webp"],
  garden: ["/assets/vfalatian-casas-1e2-jardim-01.webp", "/assets/vfalatian-1e2-lavanderia-e-jardim-02.webp"],
  laundry: ["/assets/vfalatian-1e2-lavanderia-01.webp", "/assets/vfalatian-1e2-lavanderia-e-jardim-02.webp"],
} as const;

export const constructionRooms: ConstructionRoom[] = [
  {
    room: "Chegada à",
    detail: "residência",
    displayName: "Chegada",
    slides: [
      {
        image: temporaryImages.entrance[0],
        icon: Car,
        title: "Acesso que acolhe",
        topics: [
          "Garagem integrada à entrada da residência",
          "Espaço destinado ao jardim frontal",
          "Fachada com linhas modernas e acesso privativo",
        ],
      },
      {
        image: temporaryImages.entrance[1],
        icon: House,
        title: "Acesso que acolhe",
        topics: [
          "Garagem integrada à entrada da residência",
          "Espaço destinado ao jardim frontal",
          "Fachada com linhas modernas e acesso privativo",
        ],
      },
    ],
  },
  {
    room: "Área social",
    detail: "integrada",
    displayName: "Área social",
    slides: [
      {
        image: temporaryImages.living[0],
        icon: Sofa,
        title: "Ambientes que se conectam",
        topics: [
          "Sala, cozinha e área gourmet em um espaço contínuo",
          "Cozinha integrada à sala por meio de passa-prato",
          "Área gourmet com churrasqueira para momentos de convivência",
        ],
      },
      {
        image: temporaryImages.living[1],
        icon: House,
        title: "Ambientes que se conectam",
        topics: [
          "Sala, cozinha e área gourmet em um espaço contínuo",
          "Cozinha integrada à sala por meio de passa-prato",
          "Área gourmet com churrasqueira para momentos de convivência",
        ],
      },
    ],
  },
  {
    room: "Hall",
    detail: "íntimo",
    displayName: "Hall",
    slides: [
      {
        image: temporaryImages.hall[0],
        icon:  RouteIcon,
        title: "Privacidade e organização",
        topics: [
          "Hall que conecta a área social aos ambientes íntimos",
          "Acesso distribuído aos dormitórios e banheiro social",
          "Circulação planejada para trazer praticidade ao dia a dia",
        ],
      },
      {
        image: temporaryImages.hall[1],
        icon:  RouteIcon,
        title: "Privacidade e organização",
        topics: [
          "Hall que conecta a área social aos ambientes íntimos",
          "Acesso distribuído aos dormitórios e banheiro social",
          "Circulação planejada para trazer praticidade ao dia a dia",
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
        title: "Funcionalidade nos detalhes",
        topics: [
          "Posicionado próximo aos dormitórios e à área social",
          "Ambiente projetado para atender moradores e visitantes",
          "Distribuição funcional e aproveitamento inteligente do espaço",
        ],
      },
      {
        image: temporaryImages.bathroom[1],
        icon: ShowerHead,
        title: "Funcionalidade nos detalhes",
        topics: [
          "Posicionado próximo aos dormitórios e à área social",
          "Ambiente projetado para atender moradores e visitantes",
          "Distribuição funcional e aproveitamento inteligente do espaço",
        ],
      },
    ],
  },
  {
    room: "Dormitórios",
    detail: "",
    displayName: "Dormitórios",
    slides: [
      {
        image: temporaryImages.bedrooms[0],
        icon: BedDouble,
        title: "Espaços para descansar",
        topics: [
          "Três dormitórios integrados à área íntima da residência",
          "Ambientes projetados para conforto e privacidade",
          "Distribuição que favorece diferentes possibilidades de uso",
        ],
      },
      {
        image: temporaryImages.bedrooms[1],
        icon: BedDouble,
        title: "Espaços para descansar",
        topics: [
          "Três dormitórios integrados à área íntima da residência",
          "Ambientes projetados para conforto e privacidade",
          "Distribuição que favorece diferentes possibilidades de uso",
        ],
      },
      {
        image: temporaryImages.bedrooms[2],
        icon: BedDouble,
        title: "Espaços para descansar",
        topics: [
          "Três dormitórios integrados à área íntima da residência",
          "Ambientes projetados para conforto e privacidade",
          "Distribuição que favorece diferentes possibilidades de uso",
        ],
      },
    ],
  },
  {
    room: "Jardim",
    detail: "nos fundos",
    displayName: "Jardim",
    slides: [
      {
        image: temporaryImages.garden[0],
        icon: SproutIcon,
        title: "Praticidade ao ar livre",
        topics: [
          "Jardim localizado nos fundos da residência",
          "Lavanderia coberta e integrada à área externa",
          "Espaço funcional com acesso aberto e ventilação natural",
        ],
      },
      {
        image: temporaryImages.garden[1],
        icon: SproutIcon,
        title: "Praticidade ao ar livre",
        topics: [
          "Jardim localizado nos fundos da residência",
          "Lavanderia coberta e integrada à área externa",
          "Espaço funcional com acesso aberto e ventilação natural",
        ],
      },
    ],
  },
  {
    room: "Jardim e área",
    detail: "de serviço",
    displayName: "Jardim e serviço",
    slides: [
      {
        image: temporaryImages.laundry[0],
        icon: SoapDispenserDroplet,
        title: "Praticidade ao ar livre",
        topics: [
          "Jardim localizado nos fundos da residência",
          "Lavanderia coberta e integrada à área externa",
          "Espaço funcional com acesso aberto e ventilação natural",
        ],
      },
      {
        image: temporaryImages.laundry[1],
        icon: Bubbles,
        title: "Praticidade ao ar livre",
        topics: [
          "Jardim localizado nos fundos da residência",
          "Lavanderia coberta e integrada à área externa",
          "Espaço funcional com acesso aberto e ventilação natural",
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
