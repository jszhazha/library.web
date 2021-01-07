
import moment from 'moment'

//  xxxx年x月x日 xx:xx
export function useFromatlll(date: string): string {
    return moment(date).format('lll')
}