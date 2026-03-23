import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

// Currency conversion rates (USD as base)
const currencyRates = {
  USD: { symbol: '$', rate: 1, label: 'USD' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP' },
  PLN: { symbol: 'zł', rate: 4.02, label: 'PLN' }
};

// Translations
const translations = {
  en: {
    nav: {
      services: 'Services',
      process: 'Process',
      pricing: 'Pricing',
      portfolio: 'Portfolio',
      contact: 'Contact',
      bookCall: 'Book a Call'
    },
    hero: {
      badge: 'Professional Web Development Agency',
      title: 'We Build Websites That',
      titleHighlight: 'Bring You Clients',
      subtitle: 'Helping small businesses and startups go online with high-converting websites that generate real results.',
      bookCall: 'Book a Free Call',
      getStarted: 'Get Started',
      stats: {
        websites: 'Websites Launched',
        satisfaction: 'Client Satisfaction',
        delivery: 'Days Average Delivery'
      }
    },
    pricing: {
      title: 'Simple, Transparent',
      titleHighlight: 'Pricing',
      subtitle: 'Choose the perfect plan for your business. All plans include quality design and professional development.',
      bookCall: 'Book a free call',
      helpText: 'and we\'ll help you choose.',
      notSure: 'Not sure which plan is right for you?',
      oneTime: 'one-time',
      perMonth: 'per month',
      getStarted: 'Get Started',
      monthlyManagement: 'Monthly Website Management',
      monthlyDescription: 'Keep your website fresh, secure, and performing at its best with our ongoing monthly support.',
      subscribeNow: 'Subscribe Now'
    }
  },
  pl: {
    nav: {
      services: 'Usługi',
      process: 'Proces',
      pricing: 'Cennik',
      portfolio: 'Portfolio',
      contact: 'Kontakt',
      bookCall: 'Umów rozmowę'
    },
    hero: {
      badge: 'Profesjonalna Agencja Tworzenia Stron',
      title: 'Tworzymy Strony, Które',
      titleHighlight: 'Przyciągają Klientów',
      subtitle: 'Pomagamy małym firmom i startupom wejść do internetu z wysokokonwertującymi stronami, które generują prawdziwe rezultaty.',
      bookCall: 'Umów Darmową Rozmowę',
      getStarted: 'Rozpocznij',
      stats: {
        websites: 'Uruchomionych Stron',
        satisfaction: 'Zadowolenie Klientów',
        delivery: 'Dni Średniego Wykonania'
      }
    },
    pricing: {
      title: 'Prosty, Przejrzysty',
      titleHighlight: 'Cennik',
      subtitle: 'Wybierz idealny plan dla swojej firmy. Wszystkie plany zawierają wysokiej jakości design i profesjonalny rozwój.',
      bookCall: 'Umów darmową rozmowę',
      helpText: ', a pomożemy Ci wybrać.',
      notSure: 'Nie wiesz, który plan jest dla Ciebie odpowiedni?',
      oneTime: 'jednorazowo',
      perMonth: 'miesięcznie',
      getStarted: 'Rozpocznij',
      monthlyManagement: 'Miesięczne Zarządzanie Stroną',
      monthlyDescription: 'Utrzymuj swoją stronę świeżą, bezpieczną i działającą optymalnie dzięki naszemu bieżącemu wsparciu.',
      subscribeNow: 'Subskrybuj Teraz'
    }
  },
  es: {
    nav: {
      services: 'Servicios',
      process: 'Proceso',
      pricing: 'Precios',
      portfolio: 'Portafolio',
      contact: 'Contacto',
      bookCall: 'Reservar Llamada'
    },
    hero: {
      badge: 'Agencia Profesional de Desarrollo Web',
      title: 'Construimos Sitios Web Que',
      titleHighlight: 'Te Traen Clientes',
      subtitle: 'Ayudamos a pequeñas empresas y startups a estar en línea con sitios web de alta conversión que generan resultados reales.',
      bookCall: 'Reservar Llamada Gratis',
      getStarted: 'Comenzar',
      stats: {
        websites: 'Sitios Web Lanzados',
        satisfaction: 'Satisfacción del Cliente',
        delivery: 'Días de Entrega Promedio'
      }
    },
    pricing: {
      title: 'Precios Simples y',
      titleHighlight: 'Transparentes',
      subtitle: 'Elige el plan perfecto para tu negocio. Todos los planes incluyen diseño de calidad y desarrollo profesional.',
      bookCall: 'Reserva una llamada gratis',
      helpText: 'y te ayudaremos a elegir.',
      notSure: '¿No estás seguro de qué plan es el adecuado para ti?',
      oneTime: 'pago único',
      perMonth: 'por mes',
      getStarted: 'Comenzar',
      monthlyManagement: 'Gestión Mensual del Sitio Web',
      monthlyDescription: 'Mantén tu sitio web fresco, seguro y funcionando de la mejor manera con nuestro soporte mensual continuo.',
      subscribeNow: 'Suscribirse Ahora'
    }
  },
  de: {
    nav: {
      services: 'Dienstleistungen',
      process: 'Prozess',
      pricing: 'Preise',
      portfolio: 'Portfolio',
      contact: 'Kontakt',
      bookCall: 'Anruf Buchen'
    },
    hero: {
      badge: 'Professionelle Webentwicklungsagentur',
      title: 'Wir Erstellen Websites, Die',
      titleHighlight: 'Ihnen Kunden Bringen',
      subtitle: 'Wir helfen kleinen Unternehmen und Startups online zu gehen mit hochkonvertierenden Websites, die echte Ergebnisse liefern.',
      bookCall: 'Kostenloses Gespräch Buchen',
      getStarted: 'Loslegen',
      stats: {
        websites: 'Gestartete Websites',
        satisfaction: 'Kundenzufriedenheit',
        delivery: 'Tage Durchschnittliche Lieferung'
      }
    },
    pricing: {
      title: 'Einfache, Transparente',
      titleHighlight: 'Preise',
      subtitle: 'Wählen Sie den perfekten Plan für Ihr Unternehmen. Alle Pläne beinhalten hochwertiges Design und professionelle Entwicklung.',
      bookCall: 'Buchen Sie ein kostenloses Gespräch',
      helpText: 'und wir helfen Ihnen bei der Auswahl.',
      notSure: 'Sie sind sich nicht sicher, welcher Plan für Sie geeignet ist?',
      oneTime: 'einmalig',
      perMonth: 'pro Monat',
      getStarted: 'Loslegen',
      monthlyManagement: 'Monatliche Website-Verwaltung',
      monthlyDescription: 'Halten Sie Ihre Website frisch, sicher und optimal performant mit unserer fortlaufenden monatlichen Unterstützung.',
      subscribeNow: 'Jetzt Abonnieren'
    }
  }
};

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('USD');

  const t = translations[language];
  const currencyInfo = currencyRates[currency];

  const convertPrice = (usdPrice) => {
    const converted = usdPrice * currencyInfo.rate;
    return Math.round(converted);
  };

  const formatPrice = (usdPrice) => {
    const converted = convertPrice(usdPrice);
    return `${currencyInfo.symbol}${converted.toLocaleString()}`;
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        currency,
        setCurrency,
        t,
        currencyInfo,
        convertPrice,
        formatPrice,
        availableLanguages: Object.keys(translations),
        availableCurrencies: Object.keys(currencyRates)
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
