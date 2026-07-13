import { NextResponse } from 'next/server';

function toId(input: unknown) {
  if (typeof input !== 'string') return null;
  const trimmed = input.trim();
  return /^[0-9a-fA-F-]{8,36}$/.test(trimmed) ? trimmed : null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = toId(searchParams.get('id'));

  if (!id) {
    return NextResponse.json(
      { error: 'A valid task id is required.' },
      { status: 400 }
    );
  }

  return NextResponse.json({ id, status: 'detail not wired in build smoke' });
}

export async function PATCH(request: Request) {
  const body = await request.json().catch(() => ({}));
  const id = toId(body.id);

  if (!id) {
    return NextResponse.json(
      { error: 'A valid task id is required.' },
      { status: 400 }
    );
  }

  return NextResponse.json({ id, updated: true });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function DELETE(_request: Request) {
  return NextResponse.json({ deleted: false, reason: 'detail endpoint placeholder' });
}
