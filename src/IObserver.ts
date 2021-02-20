
/*
 * Observer pattern was used in the communication between MobileAppClient and
 * the CPS. The Observable is the CPS and the Observers are the various
 * instances of MobileAppClient.
 */

export default interface IObserver {
	update(): void;
}

