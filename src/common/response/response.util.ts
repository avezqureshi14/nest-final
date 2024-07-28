export class ResponseUtil {
    static success(data: any, message: string = 'Success', statusCode: number = 200) {
        return { status: 'Success', data, message, statusCode };
    }

    static error(message: string = 'Error', statusCode: number = 500) {
        return { status: 'Failure', message, statusCode };
    }
}
