// import {crypto} from '../node_modules'
import axios from 'axios'
import secret from './secret.js'

export const newPayment = async (req, res) => {
    try {
        const merchantTxnId=req.body.txnId;
        const data={
            merchantId:secret.merchantId,
            merchantTxnId:merchantTxnId,
            merchantUserId:req.body.MUID,
            name:req.body.name,
            amount:req.body.amount*100,
            redirectUrl:`http://localhost:8080/api/v1/status/${merchantTxnId}`,
            redirectMode:'POST',
            mobileNumber:req.body.number,
            paymentInstrument:{
                type:"PAY_PAGE"
            }
        };
        const payload=JSON.stringify(data);
        const payloadMain=Buffer.from(payload).toString('base64');
        const keyIndex=1;
        const string = payloadMain+'pg/v1/pay'+secret.salt_key;
        const sha256=crypto.createHash('sha256').update(string).digest('hex');
        const checkSum=sha256+'###'+keyIndex;

        const prod_URL="https://api.phonepe.com/apis/hermes/pg/v1/pay";
        const options={
            method:'POST',
            url:prod_URL,
            headers:{
                accept:'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY':checkSum
            },
            data:{
                request:payloadMain
            }
        }

        axios.request(options).then(function(response){
            console.log(response.data)
            return res.redirect(response.data.data.instrumentResponse.redirectInfo.url)
        }).catch(function(err){
            console.log(err)
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in creating Payment Transaction",
        });
    }
};
export const checkStatus = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in checking Payment Status",
        });
    }
};