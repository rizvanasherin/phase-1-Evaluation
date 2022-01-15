

interface validationConfig{
    [property:string]:{
        [validationProperty:string]:string[];
       
    };
}

const validationObj: validationConfig={}

function Required(target:any,name:string){
    console.log(target)
    const className = target.constructor.name;

      validationObj[className]={
          ...validationObj[className],[name]:['required'],
      };
      

      console.log(validationObj);
}

function validate(obj:any){
    let validatorName=validationObj[obj.constructor.name];
    console.log(validatorName)

    if(!validatorName){
        return true;
    }
    let isValid =  true;
    for(const prop in validatorName){
        console.log(prop);
        for(const validator of validatorName[prop]){
            console.log(validator);
        switch(validator){
            case 'required':
                isValid = isValid && !!obj[prop]
                break;
            }
        }
        
    }
    return isValid;
}
class Trip{
    @Required
    destination:number; 
    @Required
    transportation:number; 
    @Required
    plan:number; 
    @Required
    period:number;

    constructor(_destination:number,_period:number,_plan:number,_transport:number){
        this.destination=_destination;
        this.period=_period;
        this.transportation=_transport;
        this.plan=_plan;
    }
}
const form = document.querySelector('form')!;
form.addEventListener('submit',(event)=>{
    event.preventDefault();

    const planE1 = document.getElementById('plan') as HTMLInputElement;
    const transportE1 = document.getElementById('transport') as HTMLInputElement;
    const destinationE1 = document.getElementById('destination') as HTMLInputElement;
    const periodE1 = document.getElementById('period') as HTMLInputElement;
    const destination = +destinationE1.value;
    const period = +periodE1.value;
    const transportation = +transportE1.value;
    const plan = +planE1.value;

    const tripObj = new Trip(destination,transportation,plan,period);

    if(!validate(tripObj)){
        alert('Fill all required data!');
        return;
    }
    
    console.log(tripObj);


})
