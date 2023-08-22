import aws from 'aws-sdk';

class S3 {
    private static Instance: S3 | null = null;
    private bucket: aws.S3 | null = null;
    public isConnect: boolean = false;

    private constructor() {
        this.isConnect = false;
    }

    public static getInstance() {
        if (!S3.Instance) {
            S3.Instance = new S3();
        }
        return S3.Instance;
    }

    async initBucket() {
        try {
            this.bucket = new aws.S3({
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                region: process.env.AWS_REGION,
            });
            console.log('INITIALIZING BUCKET');
        } catch (error) {
            throw error;
        }
    }
}

export default S3;
