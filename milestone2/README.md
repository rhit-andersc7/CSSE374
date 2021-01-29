```plantuml
class MobileAppClient implements IObserver{
	+ clientID : int
	sendOrder(Order) : Boolean
	displayResut(ControllerToAppResponse) : void
	update()
}

class Order{
	+ orderID : int
	+ address : Address
	+ drink : String
	+ condiments : [Condiment]
}

class Command{
	+ controller_id : int
	+ coffee_machine_id : int
	+ orderID : int
	+ DrinkName : String
	+ Options : [Condiment]
}

class Condiment{
	+ name
	+ quantity
}

class Address{
	+ street
	+ ZIP
}

class CPS implements IObservable{
	relayOrderAsCommand(Order) : Boolean
	sendResponse(MobileAppClient, Response) : Boolean
	add(IObeserver)
	remove(IObeserver)
	notify()
}

interface IObservable{
	add(IObeserver)
	remove(IObeserver)
	notify()
}

interface IObserver{
	update()
}

class ControllerToAppResponse{
	+ orderID
	+ coffee_machine_id
	+ status
	+ status-message
	+ error-message
}

class CoffeeMachineController implements IObserver{

	update()

	acceptCommand(Command) : Boolean
	sendOrderToCoffeeMachine(Order) : Boolean
	sendResponseToCPS() : Boolean
}

interface DatabaseConnector{
	connect()
	getValue(key)
}

class JSONDBConnector implements DatabaseConnector{ 
	connect()
	getValue(key)
}

class JSONParser{
	parseJSON(String)
}

Interface IBrewBehaviour{
	brew()
}

class CoffeeMachine{
	serve() 
}

Class Advanced_Italian implements IBrewBehaviour{
	brew()
}

Class Manual_Expresso implements IBrewBehaviour{	
	brew()
}

CPS "1" -up-> "1" JSONParser
MobileAppClient "1" -> "*" Order
CoffeeMachineController "1" -down-> "*" Order
CoffeeMachineController "1" -up-> "*" Command
Command "1" -> "*" Condiment
Order "1" -> "1" Address
CoffeeMachineController	"1" -up-> "*" CoffeeMachine
CPS "1" -up-> "*" CoffeeMachineController
CPS "1" -down-> "*" MobileAppClient
CPS "1" <-down- "*" CoffeeMachineController
MobileAppClient "*" -up-> "*" CPS
CoffeeMachineController "1" -up-> "1" ControllerToAppResponse
CPS "1" -down-> "1" JSONDBConnector
CoffeeMachine "1" <-left- "1" IBrewBehaviour
```
