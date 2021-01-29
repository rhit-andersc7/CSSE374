import IObserver from "./IObserver";

export default interface IObservable {
	add(observer: IObserver): void;
	remove(observer: IObserver): void;
	notify(): void;
}

