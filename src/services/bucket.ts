import aws from 'aws-sdk';

class Bucket {
    private static instance: Bucket | null = null;
    private s3Instance: aws.S3 | null = null;
    public isConnect: boolean = false;

    private constructor() {
        this.isConnect = false;
    }

    public static getInstance(): Bucket {
        if (!Bucket.instance) {
            Bucket.instance = new Bucket();
        }
        return Bucket.instance;
    }

    async initBucket() {
        try {
            this.s3Instance = new aws.S3({
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                region: process.env.AWS_REGION,
            });
            this.isConnect = true;
        } catch (error) {
            throw error;
        }
    }
}

export default Bucket;
