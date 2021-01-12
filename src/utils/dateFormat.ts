
import moment from 'moment'

//  xxxx年x月x日 xx:xx
export function useFromatlll(date: string): string {
    return moment(date).format('YYYY-MM-DD HH:mm:ss')
}


export function useMoment(date: string, value = 'YYYY年MM月DD日 HH:mm'): string {

    return moment(date).format(value)
}