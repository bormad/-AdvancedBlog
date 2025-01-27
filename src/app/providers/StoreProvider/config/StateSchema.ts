import { CounterShema } from '../../../../entities/Counter/model/types/counterShema';
import { UserShema } from '../../../../entities/User';

export interface StateSchema {
	counter: CounterShema;
	user: UserShema;
}
