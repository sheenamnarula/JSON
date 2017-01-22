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
    var result2filter = [];
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
  //-----------------------starting of 2nd requirement----------------------------------

   var filteredarray2=result.filter(function(el)
  {
   return  el['Age-group'] === 'All ages' && el['Total/ Rural/ Urban'] === 'Total' ;
  });
      var mappingvalues2=filteredarray2.map(function(el)
    {
    return {
      Area_Name : el['Area Name'],
    Males : el['Educational level - Graduate & above - Males'],
    Females:el['Educational level - Graduate & above - Females']
     };
    });

     // console.log(mappingvalues2);
       result2filter.push(mappingvalues2[0]);
       //groupby function

        function groupBy(array, ageGrpCol, Males,Females) 
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
                  newObj[argsPass[ageGrpCol]][Males] = 0;
                  newObj[argsPass[ageGrpCol]][Females] = 0;

                  resultArray.push(newObj[argsPass[ageGrpCol]]);
              }
               newObj[argsPass[ageGrpCol]][Males] += +argsPass[Males];
               newObj[argsPass[ageGrpCol]][Females] += +argsPass[Females];
           });
      return resultArray;
      };
       var secondrequirement = groupBy(mappingvalues2, 'Area_Name','Males','Females');
     
      //---------------------------2nd requirement ends------------------------------------------------------------
      //--------------------------3rd requirement starts------------------------------------------
       var filteredarray3=result.filter(function(el)
  {
   return  el['Age-group'] === 'All ages' && el['Total/ Rural/ Urban'] === 'Total' ;
  }); 

       var p=filteredarray3.map(function(el)
       {
        return {
          Age_Group : el['Age-group'],
          c1 : el['Educational level - Literate without educational level - Persons'],
         c2 : el['Educational level - Below Primary - Persons'],
          // ca : el['Educational level - Below Primary - Persons'],
           c3 : el['Educational level - Primary - Persons'],
          c4 : el['Educational level - Middle - Persons'],
          c5 : el['Educational level - Matric/Secondary - Persons'],
          c6 : el['Educational level - Higher secondary/Intermediate/Pre-University/Senior secondary - Persons'],
          c7 : el['Educational level - Non-technical diploma or certificate not equal to degree - Persons'],
          c8 : el['Educational level - Technical diploma or certificate not equal to degree - Persons'],
          c9 : el['Educational level - Graduate & above - Persons'],
          c10 : el['Educational level - Unclassified - Persons']


        };
       });
       //console.log(p);
        function groupBy(array, ageGrpCol, c1,c2,c3,c4,c5,c6,c7,c8,c9,c10) 
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
                  newObj[argsPass[ageGrpCol]][c1] = 0;
                  newObj[argsPass[ageGrpCol]][c2] = 0;
                  newObj[argsPass[ageGrpCol]][c3] = 0;
                  newObj[argsPass[ageGrpCol]][c4] = 0;
                  newObj[argsPass[ageGrpCol]][c5] = 0;
                  newObj[argsPass[ageGrpCol]][c6] = 0;
                  newObj[argsPass[ageGrpCol]][c7] = 0;
                  newObj[argsPass[ageGrpCol]][c8] = 0;
                  newObj[argsPass[ageGrpCol]][c9] = 0;
                  newObj[argsPass[ageGrpCol]][c10] = 0;
                  resultArray.push(newObj[argsPass[ageGrpCol]]);
              }
               newObj[argsPass[ageGrpCol]][c1] += +argsPass[c1];
               newObj[argsPass[ageGrpCol]][c2] += +argsPass[c2];
               newObj[argsPass[ageGrpCol]][c3] += +argsPass[c3];
               newObj[argsPass[ageGrpCol]][c4] += +argsPass[c4];
               newObj[argsPass[ageGrpCol]][c5] += +argsPass[c5];
               newObj[argsPass[ageGrpCol]][c6] += +argsPass[c6];
               newObj[argsPass[ageGrpCol]][c7] += +argsPass[c7];
               newObj[argsPass[ageGrpCol]][c8] += +argsPass[c8];
               newObj[argsPass[ageGrpCol]][c9] += +argsPass[c9];
               newObj[argsPass[ageGrpCol]][c10] += +argsPass[c10];

           });
      return resultArray;
      };
       var thirdrequirement = groupBy(p,'Age_Group','c1','c2','c3','c4','c5','c6','c7','c8','c9','c10');
       console.log(thirdrequirement);
       
    
      return JSON.stringify(addedAgeValues); //JSON
   
  }



