/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

// var $protobuf = require("protobuf.js");
var $protobuf = protobuf;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.mytestpackage = (function() {

    /**
     * Namespace mytestpackage.
     * @exports mytestpackage
     * @namespace
     */
    var mytestpackage = {};

    mytestpackage.testRequest = (function() {

        /**
         * Properties of a testRequest.
         * @memberof mytestpackage
         * @interface ItestRequest
         * @property {number} id testRequest id
         * @property {string} name testRequest name
         */

        /**
         * Constructs a new testRequest.
         * @memberof mytestpackage
         * @classdesc Represents a testRequest.
         * @implements ItestRequest
         * @constructor
         * @param {mytestpackage.ItestRequest=} [properties] Properties to set
         */
        function testRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * testRequest id.
         * @member {number} id
         * @memberof mytestpackage.testRequest
         * @instance
         */
        testRequest.prototype.id = 0;

        /**
         * testRequest name.
         * @member {string} name
         * @memberof mytestpackage.testRequest
         * @instance
         */
        testRequest.prototype.name = "";

        /**
         * Creates a new testRequest instance using the specified properties.
         * @function create
         * @memberof mytestpackage.testRequest
         * @static
         * @param {mytestpackage.ItestRequest=} [properties] Properties to set
         * @returns {mytestpackage.testRequest} testRequest instance
         */
        testRequest.create = function create(properties) {
            return new testRequest(properties);
        };

        /**
         * Encodes the specified testRequest message. Does not implicitly {@link mytestpackage.testRequest.verify|verify} messages.
         * @function encode
         * @memberof mytestpackage.testRequest
         * @static
         * @param {mytestpackage.ItestRequest} message testRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        testRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            return writer;
        };

        /**
         * Encodes the specified testRequest message, length delimited. Does not implicitly {@link mytestpackage.testRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mytestpackage.testRequest
         * @static
         * @param {mytestpackage.ItestRequest} message testRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        testRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a testRequest message from the specified reader or buffer.
         * @function decode
         * @memberof mytestpackage.testRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mytestpackage.testRequest} testRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        testRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.mytestpackage.testRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.int32();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("id"))
                throw $util.ProtocolError("missing required 'id'", { instance: message });
            if (!message.hasOwnProperty("name"))
                throw $util.ProtocolError("missing required 'name'", { instance: message });
            return message;
        };

        /**
         * Decodes a testRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mytestpackage.testRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mytestpackage.testRequest} testRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        testRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a testRequest message.
         * @function verify
         * @memberof mytestpackage.testRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        testRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message.id))
                return "id: integer expected";
            if (!$util.isString(message.name))
                return "name: string expected";
            return null;
        };

        /**
         * Creates a testRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mytestpackage.testRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mytestpackage.testRequest} testRequest
         */
        testRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.mytestpackage.testRequest)
                return object;
            var message = new $root.mytestpackage.testRequest();
            if (object.id != null)
                message.id = object.id | 0;
            if (object.name != null)
                message.name = String(object.name);
            return message;
        };

        /**
         * Creates a plain object from a testRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mytestpackage.testRequest
         * @static
         * @param {mytestpackage.testRequest} message testRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        testRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = 0;
                object.name = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            return object;
        };

        /**
         * Converts this testRequest to JSON.
         * @function toJSON
         * @memberof mytestpackage.testRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        testRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return testRequest;
    })();

    return mytestpackage;
})();

module.exports = $root;
