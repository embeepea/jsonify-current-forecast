describe("currentWeatherXMLObjectToStringArray", function () {
    "use strict";

    describe("function definition", function () {

        it("should define a function named currentWeatherXMLObjectToStringArray", function () {
            expect(typeof(currentWeatherXMLObjectToStringArray)).toBe("function");
        });

    });

    describe("parsing from test file data/Avl_0411-0418.xml", function () {

        var loadingFinished = false,
            data,
            n,
            arr;

        $.ajax({
            url : '../data/Avl_0411-0418.xml',
            dataType : 'text',
            success : function (response) {
                loadingFinished = true;
                data = response;
            }
        });

        beforeEach(function () {
            
            waitsFor(function() {
                if (loadingFinished) {
                    n = handleXML(data);
                    arr = currentWeatherXMLObjectToStringArray(n, [ { 'parameter' : 'temperature', 'type' : 'hourly' },
                                                                    { 'parameter' : 'temperature', 'type' : 'dew point' },
                                                                    { 'parameter' : 'probability-of-precipitation', 'type' : 'floating' } ]);
                }

                return loadingFinished;

            });
        });

        describe('currentWeatherXMLObjectToStringArray', function () {
         
            it('should return an array', function () {
                expect(arr).toEqual(jasmine.any(Array));
            });

            it('should store arrays in the array ordered by date and time', function () {
                expect(arr[0][0]).toEqual('2013041112');
                expect(arr[10][0]).toEqual('2013041122');
                expect(arr[15][0]).toEqual('2013041203');
                expect(arr[35][0]).toEqual('2013041223');
                expect(arr[60][0]).toEqual('2013041400'); 
            });

            it('should not store arrays with times but no values', function () {
                expect(arr[165]).toBeUndefined();
                expect(arr[166]).toBeUndefined();
                expect(arr[167]).toBeUndefined();
            });

            it('should store the values of the parameters called as a string', function () {
                //hourly temperatures
                expect(arr[0][1]).toEqual('68');
                expect(arr[10][1]).toEqual('65');
                expect(arr[15][1]).toEqual('57');
                expect(arr[35][1]).toEqual('52');
                expect(arr[60][1]).toEqual('48');

                //dew point temperature
                expect(arr[0][2]).toEqual('54');
                expect(arr[10][2]).toEqual('56');
                expect(arr[15][2]).toEqual('56');
                expect(arr[35][2]).toEqual('39');
                expect(arr[60][2]).toEqual('34');

                //probablility of precipitation
                expect(arr[0][3]).toEqual('5');
                expect(arr[10][3]).toEqual('99');
                expect(arr[15][3]).toEqual('100');
                expect(arr[35][3]).toEqual('7');
                expect(arr[60][3]).toEqual('7');

                //entire array in proper order
                expect(arr[0]).toEqual(['2013041112', '68', '54', '5']);
                expect(arr[10]).toEqual(['2013041122', '65', '56', '99']);
                expect(arr[15]).toEqual(['2013041203', '57', '56', '100']);
                expect(arr[35]).toEqual(['2013041223', '52', '39', '7']);
                expect(arr[60]).toEqual(['2013041400', '48', '34', '7']);
            });

        });
    });

    describe("parsing from test file data/Seattle_0430-0507.xml", function () {

        var loadingFinished = false,
            data,
            n,
            arr;

        $.ajax({
            url : '../data/Seattle_0430-0507.xml',
            dataType : 'text',
            success : function (response) {
                loadingFinished = true;
                data = response;
            }
        });

        beforeEach(function () {
            
            waitsFor(function() {
                if (loadingFinished) {
                    n = handleXML(data);
                    arr = currentWeatherXMLObjectToStringArray(n, [ { 'parameter' : 'temperature', 'type' : 'hourly' },
                                                                    { 'parameter' : 'temperature', 'type' : 'dew point' },
                                                                    { 'parameter' : 'probability-of-precipitation', 'type' : 'floating' } ]);
                }

                return loadingFinished;

            });
        });

        describe('currentWeatherXMLObjectToStringArray', function () {
         
            it('should return an array', function () {
                
                console.log(n);
                
                expect(arr).toEqual(jasmine.any(Array));
            });

            it('should store arrays in the array ordered by date and time', function () {
                expect(arr[0][0]).toEqual('2013043010');
                expect(arr[10][0]).toEqual('2013043020');
                expect(arr[15][0]).toEqual('2013050101');
                expect(arr[35][0]).toEqual('2013050121');
                expect(arr[60][0]).toEqual('2013050222'); 
            });

            it('should store the values of the parameters called as a string', function () {
                //hourly temperatures
                expect(arr[0][1]).toEqual('42');
                expect(arr[10][1]).toEqual('55');
                expect(arr[15][1]).toEqual('45');
                expect(arr[35][1]).toEqual('58');
                expect(arr[60][1]).toEqual('60');

                //dew point temperature
                expect(arr[0][2]).toEqual('33');
                expect(arr[10][2]).toEqual('34');
                expect(arr[15][2]).toEqual('35');
                expect(arr[35][2]).toEqual('35');
                expect(arr[60][2]).toEqual('39');

                //probablility of precipitation
                expect(arr[0][3]).toEqual('15');
                expect(arr[10][3]).toEqual('3');
                expect(arr[15][3]).toEqual('3');
                expect(arr[35][3]).toEqual('0');
                expect(arr[60][3]).toEqual('0');

                //entire array in proper order
                expect(arr[0]).toEqual(['2013043010', '42', '33', '15']);
                expect(arr[10]).toEqual(['2013043020', '55', '34', '3']);
                expect(arr[15]).toEqual(['2013050101', '45', '35', '3']);
                expect(arr[35]).toEqual(['2013050121', '58', '35', '0']);
                expect(arr[60]).toEqual(['2013050222', '60', '39', '0']);
            });
        });
    });


});
