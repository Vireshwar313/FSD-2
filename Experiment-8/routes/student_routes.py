from flask import Blueprint, request, jsonify

student_bp = Blueprint("student_bp", __name__)

# Temporary in-memory database
students = []
student_id_counter = 1

# Create Student (POST)
@student_bp.route("/", methods=["POST"])
def create_student():
    global student_id_counter

    data = request.get_json()

    if not data or "name" not in data:
        return jsonify({"error": "Name is required"}), 400

    student = {
        "id": student_id_counter,
        "name": data["name"],
        "age": data.get("age", None)
    }

    students.append(student)
    student_id_counter += 1

    return jsonify(student), 201


# Get All Students (GET)
@student_bp.route("/", methods=["GET"])
def get_students():
    return jsonify(students), 200


# Get Single Student (GET by ID)
@student_bp.route("/<int:id>", methods=["GET"])
def get_student(id):
    for student in students:
        if student["id"] == id:
            return jsonify(student), 200

    return jsonify({"error": "Student not found"}), 404


# Update Student (PUT)
@student_bp.route("/<int:id>", methods=["PUT"])
def update_student(id):
    data = request.get_json()

    for student in students:
        if student["id"] == id:
            student["name"] = data.get("name", student["name"])
            student["age"] = data.get("age", student["age"])
            return jsonify(student), 200

    return jsonify({"error": "Student not found"}), 404


# Delete Student (DELETE)
@student_bp.route("/<int:id>", methods=["DELETE"])
def delete_student(id):
    global students

    students = [student for student in students if student["id"] != id]

    return jsonify({"message": "Student deleted successfully"}), 200