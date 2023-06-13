import styles from './ModalContent.module.css';
export default function ModalContent({ onClose }) {
    return (
        <div className={styles.modal}>
            <div>I'm a modal dialog</div>
            <button onClick={onClose}>Close</button>
        </div>
    );
}
