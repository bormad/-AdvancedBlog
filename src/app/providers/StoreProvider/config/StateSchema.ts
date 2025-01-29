import { CounterShema } from '../../../../entities/Counter/model/types/counterShema';
import { UserSchema } from '../../../../entities/User';
import { LoginSchema } from '../../../../features/AuthByUsername';

export interface StateSchema {
	counter: CounterShema;
	user: UserSchema;
	loginForm?: LoginSchema;
}
