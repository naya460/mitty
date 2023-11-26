import prisma from "lib/prisma";

export default async function getUserDisplayName(
  user_id: string,
): Promise<undefined | string> {
  const display_name = (await prisma.user.findUnique({
    select: {
      display_name: true,
    },
    where: {
      user_id: user_id,
    },
  }))?.display_name;

  if (display_name === null) {
    return undefined;
  }
  return display_name;
}
