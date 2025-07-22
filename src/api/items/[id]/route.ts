import { NextRequest } from 'next/server'

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  // lógica para deletar item com id

  return new Response('Item deletado com sucesso', { status: 200 });
}
