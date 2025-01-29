import styles from './Modal.module.scss';
import { classNames } from '../../../shared/lib/classNames/classNames';
import {
	ReactNode,
	useEffect,
	useRef,
	useState,
	MouseEvent,
	useCallback
} from 'react';
import { Portal } from '../Portal/Portal';
import { useTheme } from '../../../app/providers';

interface ModalProps {
	className?: string;
	children?: ReactNode;
	isOpen?: boolean;
	onClose?: () => void;
	lazy?: boolean;
}

const ANIMATION_DELAY = 300;

export const Modal = (props: ModalProps) => {
	const { className, children, isOpen, onClose, lazy } = props;

	const [isClosing, setIsClosing] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

	const { theme } = useTheme();

	useEffect(() => {
		if (isOpen) {
			setIsMounted(true);
		}
	}, [isOpen]);

	const mods: Record<string, boolean> = {
		[styles.opened]: isOpen,
		[styles.isClosing]: isClosing
	};

	const closeHandler = useCallback(() => {
		if (onClose) {
			setIsClosing(true);
			timerRef.current = setTimeout(() => {
				onClose();
				setIsClosing(false);
			}, ANIMATION_DELAY);
		}
	}, [onClose]);

	const onContentClick = (e: MouseEvent) => {
		e.stopPropagation();
	};

	const onOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			closeHandler();
		}
	};

	const onKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				closeHandler();
			}
		},
		[closeHandler]
	);

	useEffect(() => {
		if (isOpen) {
			window.addEventListener('keydown', onKeyDown);
		}

		return () => {
			clearTimeout(timerRef.current);
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [isOpen, onKeyDown]);

	if (lazy && !isMounted) return null;

	return (
		<Portal>
			<div className={classNames(styles.modal, mods, [className, theme])}>
				<div className={styles.overlay} onClick={onOverlayClick}>
					<div className={styles.content} onClick={onContentClick}>
						{children}
					</div>
				</div>
			</div>
		</Portal>
	);
};
