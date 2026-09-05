from database import db

class Region(db.Model):
    __tablename__ = "regions"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)

    # Satu region dapat memiliki banyak user
    users = db.relationship(
        "User",
        back_populates="region",
        lazy=True
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    email = db.Column(
        db.String(150),
        unique=True,
        nullable=False
    )

    password_hash = db.Column(
        db.String(255),
        nullable=False
    )

    # Foreign key ke tabel regions
    region_id = db.Column(
        db.Integer,
        db.ForeignKey("regions.id"),
        nullable=False
    )

    # Relasi User -> Region
    region = db.relationship(
        "Region",
        back_populates="users"
    )

    created_at = db.Column(
        db.DateTime,
        server_default=db.func.current_timestamp()
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "region": self.region.to_dict() if self.region else None
        }