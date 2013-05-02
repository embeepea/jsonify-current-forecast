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
                                                                    { 'parameter' : 'probablility-of-preciptiation', 'type' : 'floating' } ]);
                }

                return loadingFinished;

            });
        });

        describe('currentWeatherXMLObjectToStringArray', function () {

            it('should return an array', function () {
                expect(arr).toEqual(jasmine.any(Array));
            });

        });
    });
});
