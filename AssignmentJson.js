    var fs = require('fs');

    var data = '';

    var readStream = fs.createReadStream('merge4.csv', 'utf8');
    var writeStream = fs.createWriteStream('Data_Source/myjson.json', 'utf8');
    var writeStream2 = fs.createWriteStream('Data_Source/second.json', 'utf8');
    var writeStream3 = fs.createWriteStream('Data_Source/third.json', 'utf8');
    var json;

    readStream.on('data', function(chunk) {  
        data += chunk;
    }).on('end', function() {
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
     return  el['Age-group'] != 'All ages' && el['Total/ Rural/ Urban'] === 'Total' ;
    });
      var mappingvalues=filteredarray1.map(function(el)
      {
      return {
        Age_Group : el['Age-group'],
      Literate_Persons : el['Literate - Persons'] };
      });

     
         var addedAgeValues = groupBy(mappingvalues,'Age_Group','Literate_Persons');
        // console.log(addedAgeValues);
        
     function groupBy(array,ageGrpCol,value)
  {
      var finalArray=[];
       newObj={};
      array.forEach(function(argPass)
      {
          if(!newObj[argPass[ageGrpCol]])
          {
              newObj[argPass[ageGrpCol]]={};
              newObj[argPass[ageGrpCol]][ageGrpCol]=argPass[ageGrpCol];
              newObj[argPass[ageGrpCol]][value]=0;
              finalArray.push(newObj[argPass[ageGrpCol]]);
          }
          newObj[argPass[ageGrpCol]][value] += +argPass[value];
      });

              return finalArray; 
  };
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
    
         var json2=JSON.stringify(secondrequirement);
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
         var object1={};
         object1['Education_Categoty']='Literate without educational level';
         object1['Total_Population'] = thirdrequirement[0]['c1'];
         var object2={};
         object2['Education_Categoty']='Below Primary';
         object2['Total_Population'] = thirdrequirement[0]['c2'];
         var object3={};
         object3['Education_Categoty']='Primary';
         object3['Total_Population'] = thirdrequirement[0]['c3'];
         var object4={};
         object4['Education_Categoty']='Middle';
         object4['Total_Population'] = thirdrequirement[0]['c4'];
         var object5={};
         object5['Education_Categoty']='Matric/Secondary';
         object5['Total_Population'] = thirdrequirement[0]['c5'];
         var object6={};
         object6['Education_Categoty']='Higher secondary/Intermediate/Pre-University/Senior secondary';
         object6['Total_Population'] = thirdrequirement[0]['c6'];
         var object7={};
         object7['Education_Categoty']='Non-technical diploma or certificate not equal to degree';
         object7['Total_Population'] = thirdrequirement[0]['c7'];
         var object8={};
         object8['Education_Categoty'] ='Technical diploma or certificate not equal to degree';
         object8['Total_Population'] = thirdrequirement[0]['c8'];
         var object9 = {};
         object9['Education_Categoty']='Graduate & above';
         object9['Total_Population'] = thirdrequirement[0]['c9'];
         var object10 = {};
         object10['Education_Categoty']='Unclassified';
         object10['Total_Population'] = thirdrequirement[0]['c10'];
         //console.log(object10);
         var finalthirdarray=[];
         finalthirdarray.push(object1);
         finalthirdarray.push(object2);
         finalthirdarray.push(object3);
         finalthirdarray.push(object4);
         finalthirdarray.push(object5);
         finalthirdarray.push(object6);
         finalthirdarray.push(object7);
         finalthirdarray.push(object8);
         finalthirdarray.push(object9);
         finalthirdarray.push(object10);

         var json3=JSON.stringify(finalthirdarray);
    json=JSON.stringify(addedAgeValues);
    writeStream.write(json);

     writeStream.end();
     writeStream2.write(json2);
     writeStream2.end();
     writeStream3.write(json3);
     writeStream3.end();
    });

 

