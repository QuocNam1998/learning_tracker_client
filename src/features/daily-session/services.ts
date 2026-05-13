// import { NEXT_PUBLIC_API_URL } from '@/libs/env';
export const dailySessionServices = {
  async getDailSession() {
    if (!process.env.NEXT_PUBLIC_API_URL) return;
    try {
      const result = await fetch('http://localhost:1998/' + 'daily-session');
      console.log('>the result', result);
      return result;
    } catch (error) {
      console.error('>error', error);
    }
  },
};
