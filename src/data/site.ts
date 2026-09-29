// Datos institucionales de Rijo Suplidora (Lambar Trading Corporation)
// Fuente: documentos provistos por la clienta (formulario de información + base corporativa).

export const site = {
  legalName: 'Lambar Trading Corporation',
  tradeName: 'Rijo Suplidora',
  founded: 2017,
  email: {
    public: 'contacto@rijosuplidora.com',
    admin: 'lambartradingcorporation@gmail.com',
  },
  phoneDisplay: '(809) 551-1216',
  phoneIntl: '+18095511216',
  whatsappNumber: '18095511216',
  address: {
    line: 'Carretera Verón-Punta Cana, No. 118, Km 8, La Otra Banda',
    city: 'Higüey, La Altagracia',
    country: 'República Dominicana',
    full: 'Carretera Verón-Punta Cana, No. 118, Km 8, La Otra Banda, Higüey, La Altagracia, República Dominicana',
  },
  hours: '7:00 AM – 7:00 PM',
  social: {
    instagram: 'https://www.instagram.com/rijosuplidorard',
    instagramHandle: '@rijosuplidorard',
    facebook: 'https://www.facebook.com/rijosuplidora',
    facebookHandle: '@rijosuplidora',
    x: 'https://x.com/rijosuplidorard',
    xHandle: '@rijosuplidorard',
  },
  mapsEmbedSrc:
    'https://www.google.com/maps?q=Carretera+Ver%C3%B3n-Punta+Cana+No.118+Km+8+La+Otra+Banda+Hig%C3%BCey+La+Altagracia+Rep%C3%BAblica+Dominicana&output=embed',
  mapsLinkSrc:
    'https://www.google.com/maps/search/?api=1&query=Carretera+Ver%C3%B3n-Punta+Cana+No.118+Km+8+La+Otra+Banda+Hig%C3%BCey+La+Altagracia+Rep%C3%BAblica+Dominicana',
} as const

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`
}