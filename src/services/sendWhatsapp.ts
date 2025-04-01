import twilio from 'twilio';

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const from = process.env.ORIGIN_WHATSAPP;
const contentSid = process.env.CONTENT_SID;

interface SendMessageInterface {
  to: string;
  receiverName: string;
  items: string;
}

const sendMessage = async ({ items, receiverName, to }: SendMessageInterface) => {
  const client = twilio(accountSid, authToken);
  try {
    const message = await client.messages.create({
      from,
      to: `whatsapp:${to}`,
      contentSid,
      contentVariables: JSON.stringify({ 1: receiverName.trim(), 2: items }),
    });
    return message;
  } catch (error) {
    console.log(error);
    throw new Error(`Erro ao enviar mensagem para o whatsApp: ${to}`);
  }
};

export { sendMessage };
