
from asyncio.log import logger
from __init__ import app, login_required
from flask import  Response, json, request, jsonify, g
from data_classes.common_classes import AskRequest, Language, Message
from services.handle_ask import AskError, handle_ask_non_streaming, handle_ask_streaming
from services.handle_guess import GuessError, store_ip_guess




@app.route('/api/v1/guess/<session_id>/ask', methods=['POST'])
def guess_ask(session_id):
    """Create a new guess"""
    try:
        # 1. prepare payload
        body = request.json
        ip_address = request.remote_addr
        print(f"Received guess from IP: {ip_address}")
         # Validate IP address
        if not ip_address:
            raise GuessError("IP address is required", 400)
        # 2. store guess
        store_ip_guess(ip_address)

        messages = [Message(**msg) for msg in body.get('messages', [])]
        ask_request = AskRequest(
            messages=messages,
            session_id=session_id,
            language=body.get('language', Language.VI),
            options=body.get('options'),
            model=body.get('model', 'gpt-4o'),
            agent_id=body.get('agent_id'),
            context=body.get('context'),
        )
        # session_id
        if not session_id:
            raise AskError("Session ID is required")
        # 2. handle request
        is_streaming = ask_request.options and ask_request.options.get("stream", False)
        try:
            if is_streaming:
                return handle_ask_streaming(ask_request, False)
            else:
                results = handle_ask_non_streaming(ask_request)
                return jsonify(results), 200
        except AskError as e:
            return Response(
                response=json.dumps({"error": e.message}),
                status=e.status_code,
                mimetype="application/json"
            )
    except Exception as e:
        logger.error(f"Error processing ask: {str(e)}")
        return Response(
            response=json.dumps({"error": str(e)}),
            status=500,
            mimetype="application/json"
        )


@app.route('/api/v1/guess/remove', methods=['DELETE'])
@login_required
def remove_guesses():
    """Remove all guesses made by an IP address"""
    try:
        ip_address = request.get_json()["ip_address"]
        if not ip_address:
            return jsonify({"error": "IP address is required"}), 400
        from services.handle_guess import remove_ip_guesses
        remove_ip_guesses(ip_address)
        return jsonify({"message": f"Guesses for IP {ip_address} have been removed."}), 200
    except Exception as e:
        logger.error(f"Error removing guesses: {str(e)}")
        return Response(
            response=json.dumps({"error": str(e)}),
            status=500,
            mimetype="application/json"
        )