import axios from '../../libs/axios';
import { AxiosError, AxiosResponse } from 'axios';

const sendMail = async (
  req: any, res: any
) => {
  // リクエストボディの内容を取得
  //  実際の処理ではお問い合わせ内容（名前やメールアドレス、お問い合わせ内容など）も取得しています


  const token  = req.body.token;
  
  // serverlessの場合は以下の記述でオリジンを取得可能
  
  // ホスト名のみを取得する

  
  // reCAPTCHAによるチェックの実施
  const recaptchaRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `secret=${process.env.RECAPCHA_SECRET_KEY}&response=${token}`,
  });
  
　　// チェック結果が代入される
  const recaptchaResult = await recaptchaRes.json();
  console.log(recaptchaResult);
  
  if (0.5<recaptchaResult.score) {
    res.status(200).json({ "success": true })
  }else{
    res.status(500).json({ "success": false })
  }

}
export default sendMail;