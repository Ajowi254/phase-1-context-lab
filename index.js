/* Your Code Here */
function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords() {
    return employees.map(createEmployeeRecords); 
      }


  function createTimeOutEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
  
    employee.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date,
    });
  
    return employee;
  }

  function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
  }
  //Define the wagesEarnedOnDate function
  function wagesEarnedOnDate(employeeRecord, date) {
  
  // Get the timeInEvent and timeOutEvent for the given date
  const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
  const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);

  // Calculate the hours worked and multiply by the employee's rate per hour
  const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
  const wagesEarned = hoursWorked * employeeRecord.payPerHour;

  return wagesEarned;
}

  // Calculate the total wages earned for each date and add them together
  const payable = eligibleDates.reduce(function(memo, d) {
    return memo + wagesEarnedOnDate.call(this, d)
  }.bind(this), 0)
  

  function findEmployeeByFirstName (srcArray, firstName) {
    return srcArray.find(function(rec){
      return rec.firstName === firstName
    })
  }

  function calculatePayroll(employees) {
    return employees.reduce(function(memo, employee){
      return memo + allWagesFor(employee)
    }, 0)
  }
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

