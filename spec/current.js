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
        });
    });
});