import { FloatingWhatsApp } from 'react-floating-whatsapp';
import iconportalsonoro from '../assets/img/iconportalsonoro.png';

export const WhatsappButton = () => {
  return (
    <FloatingWhatsApp
      phoneNumber='+56988775000'
      allowEsc
      allowClickAway
      avatar={iconportalsonoro}
      accountName='Portal Sonoro'
      statusMessage='Normalmente responde en 1 hora'
      chatMessage='¡Hola! ¿Cómo puedo ayudarte?'
      placeholder='Escribe un mensaje...'
      notification
      notificationSound
      darkMode={false}
    />
  );
};
