/* eslint-disable @typescript-eslint/no-explicit-any */

import { PrismaClient } from '@prisma/client';
 
const prisma = new PrismaClient();

/** @type {import('./$types').RequestHandler} */

export async function GET({ url } : any) {
  let session_id = url.searchParams.get('session_id');
  session_id = session_id.split("//");
  session_id.shift();
  let response: Array<any> = [];
  for (var productid in session_id) {
    let favourite = await prisma.product.findMany({
      where: {
        id: parseInt(session_id[parseInt(productid)])
      },
    });
    if (favourite.toString() != "") {
      response.push(favourite);
    }
  }
  return new Response(JSON.stringify(response))
}
