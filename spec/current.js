describe("parse_dly", function () {
    "use strict";

    describe("function definition", function () {

        it("should define a function named handleXML", function () {
            expect(typeof(handleXML)).toBe("function");
        });

    });

    describe("parsing from test file data/Avl_0411-0418.xml", function () {

        var loadingFinished = false,
            data,
            n;

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
                }
                return loadingFinished;
            });
        });

        describe('handleXML', function () {
            it('should store the location', function () {
                expect(n.location['city']).toEqual('Asheville NC');
            });

            it('should store the element', function () {
                expect(n.temperature).toEqual(jasmine.any(Object));
            });

            it('should store the element type, when exists', function () {
                expect(n.temperature['hourly']).toEqual(jasmine.any(Object));
            });

            it('should store the year', function () {
                expect(n.temperature['hourly'][2013]).toEqual(jasmine.any(Array));
            });

            it('should store the month', function () {
                expect(n.temperature['hourly'][2013][3]).toEqual(jasmine.any(Array));
            });

            it('should store the day', function () {
                expect(n.temperature['hourly'][2013][3][10]).toEqual(jasmine.any(Array));
            });

            it('should store the hour', function () {
                expect(n.temperature['hourly'][2013][3][10][12]).toBeDefined();
            });

            it('should store the value', function () {
                expect(n.temperature['hourly'][2013][3][10][12]).toEqual(68);
            });

        });
    });
});
