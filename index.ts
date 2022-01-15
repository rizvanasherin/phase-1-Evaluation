

interface validationConfig{
    [property:string]:{
        [validationProperty:string]:string[];  
    };
}

const validationObj: validationConfig={}

function required(target:any,name:string){
    console.log(target)
    const className = target.constructor.name;

      validationObj[className]={
          ...validationObj[className],[name]:['required'],
      };
      

      console.log(validationObj);
}
function positive(target:any,name:string){
    console.log(target)
    const className = target.constructor.name;
      validationObj[className]={
          ...validationObj[className],[name]:['positive'],
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
            case 'positive':
                    isValid = obj[prop]>0;
                    break;
            }
        }
        
    }
    return isValid;
}
class Trip{
    @required
    destination:string; 

    @positive
    transportation_id:number; 

    @positive
    plan_id:number; 

    @positive
    period:number;

    constructor(_destination:string,_period:number,_transport:number,_plan:number){
        this.destination=_destination;
        this.period=_period;
        this.transportation_id=_transport;
        this.plan_id=_plan;
    }
}
const form = document.querySelector('form')!;
form.addEventListener('submit',(event)=>{
    event.preventDefault();

    const destinationE1 = document.getElementById('destination') as HTMLInputElement;
    const periodE1 = document.getElementById('period') as HTMLInputElement;
    const transportE1 = document.getElementById('transport') as HTMLInputElement;
    const planE1 = document.getElementById('plan') as HTMLInputElement;

 

    const destination = destinationE1.value;
    const period = +periodE1.value;
    const transportation = +transportE1.value;
    const plan_id = +planE1.value;

    const tripObj = new Trip(destination,period,transportation,plan_id);

    if(!validate(tripObj)){
        alert('Enter Valid data');
        return;
    }
    else{
        alert('Successfully added');
    }
    
    console.log(tripObj);



})
