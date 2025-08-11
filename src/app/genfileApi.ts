import { useMutation } from '@tanstack/react-query';

export type GenFileParams = {
  name: string;
  date: string;
  toEmail: string;
};

export function useGenFile() {
  return useMutation({
    mutationFn: async (params: GenFileParams) => {
      const res = await fetch('http://localhost:8081/api/doc/sendMail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      if (!res.ok) throw new Error('Gửi thất bại!');
      return true;
    },
  });
}
