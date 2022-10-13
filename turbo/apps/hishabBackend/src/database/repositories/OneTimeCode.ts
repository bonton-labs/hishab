import { prismaClient } from "../postgres";
import { TRPCError } from "@trpc/server";

export class OneTimeCodeRepo {
  async generateCode(userId: number) {
    const codes = await prismaClient.oneTimeCode.findMany({
      where: {
        userId: userId,
        isValid: true
      },
    });

    // loop through the codes
    for (let code of codes){
      // make the code invalid
      await prismaClient.oneTimeCode.update({
        where: {id: code.id},
        data: {isValid: false}
      })
    } 

    const newOneTimeCode = await prismaClient.oneTimeCode.create({
      data: {
        userId: userId,
        validitySeconds: 300,
        code: '1111',
      }
    })

    return newOneTimeCode
  }

  async verifyCode(userId: number, code:string){
    const oneTimeCode = await prismaClient.oneTimeCode.findFirst({
      where: {
        userId: userId,
        isValid: true
      }
    })

    if (!oneTimeCode){
      throw new TRPCError({
        code: "FORBIDDEN"
      })
    }

    if (code === oneTimeCode.code){
      await prismaClient.oneTimeCode.update({
        where: {
          id: oneTimeCode.id
        },
        data: {
          validitySeconds: 600
        }
      })
      return {
        isValid: true
      }
    } else {
      throw new TRPCError({
        code: "FORBIDDEN"
      })
    }
  }
}

export const oneTimeCodeRepo = new OneTimeCodeRepo();
