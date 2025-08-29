import { NextResponse } from 'next/server';

export async function GET() {
  // Cria a resposta de redirect diretamente
  const response = NextResponse.redirect('/login', 302);

  // Remove os cookies
  response.cookies.set('token', '');
  response.cookies.set('username', '');

  return response;
}
