  var fs = require('fs');

  var data = '';

  var readStream = fs.createReadStream('merge4.csv', 'utf8');
  var writeStream = fs.createWriteStream('Data_Source/myjson.txt', 'utf8');
  var json;

  readStream.on('data', function(chunk) {  
      data += chunk;
  }).on('end', function() {
  json=csvJSON(data);
  writeStream.write(json);

  writeStream.end();
  });

  function csvJSON(data){
    var lines=data.split("\r\n");

    var result = [];

    var headers=lines[0].split(",");
   
  for(var j=1;j<lines.length;j++){

      var obj = {};
      var currentline=lines[j].split(",");

       for(i in lines)
       {
        obj[headers[i]]=currentline[i];
       }
       
      result.push(obj);

    }


    var filteredarray1=result.filter(function(el)
  {
   return  el['Age-group'] && el['Total/ Rural/ Urban'] === 'Total' ;
  });
    var mappingvalues=filteredarray1.map(function(el)
    {
    return {
      Age_Group : el['Age-group'],
    Literate_Persons : el['Literate - Persons'] };
    });
  //console.log(mappingvalues);

   function groupBy(array, ageGrpCol, value) 
       {
          var newObj = {};
          var resultArray = [];
          array.forEach(function (argsPass) 
          {
           // console.log(newObj[argsPass[ageGrpCol]]);
              if (!newObj[argsPass[ageGrpCol]]) 
              {
                  newObj[argsPass[ageGrpCol]] = {};
                  newObj[argsPass[ageGrpCol]][ageGrpCol] = argsPass[ageGrpCol];
                  newObj[argsPass[ageGrpCol]][value] = 0;
                  resultArray.push(newObj[argsPass[ageGrpCol]]);
              }
               newObj[argsPass[ageGrpCol]][value] += +argsPass[value];
           });
      return resultArray;
      };
       var addedAgeValues = groupBy(mappingvalues, 'Age_Group','Literate_Persons');
  //console.log(addedAgeValues);
    return JSON.stringify(addedAgeValues); //JSON
   
  }
