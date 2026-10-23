"""Seed the initial furniture catalog."""

from alembic import op
import sqlalchemy as sa


revision = '4f8a2c1d9b30'
down_revision = 'e6ee8e6b87e9'
branch_labels = None
depends_on = None


PRODUCTS = (
    {
        'name': 'Elegant Velvet Sofa',
        'description': 'A comfortable velvet sofa with a refined, timeless design.',
        'price': 1299.00,
        'image_url': 'elegant-velvet-sofa.jpg',
    },
    {
        'name': 'Mid-Century Bookshelf',
        'description': 'A practical bookshelf with clean mid-century lines.',
        'price': 449.00,
        'image_url': 'mid-century-bookshelf.jpg',
    },
    {
        'name': 'Modern Coffee Table',
        'description': 'A contemporary coffee table designed for everyday living.',
        'price': 299.00,
        'image_url': 'modern-coffee-table.jpg',
    },
    {
        'name': 'Plush Armchair with Ottoman',
        'description': 'A plush armchair and matching ottoman for comfortable lounging.',
        'price': 699.00,
        'image_url': 'plush-armchair-with-ottoman.jpg',
    },
    {
        'name': 'Rustic Wooden Dining Table',
        'description': 'A wooden dining table with a warm rustic finish.',
        'price': 899.00,
        'image_url': 'rustic-wooden-dining-table.jpg',
    },
)


def upgrade():
    connection = op.get_bind()
    if connection.execute(sa.text('SELECT 1 FROM product LIMIT 1')).first():
        return

    op.bulk_insert(
        sa.table(
            'product',
            sa.column('name', sa.String()),
            sa.column('description', sa.Text()),
            sa.column('price', sa.Float()),
            sa.column('image_url', sa.String()),
        ),
        list(PRODUCTS),
    )


def downgrade():
    product_table = sa.table(
        'product',
        sa.column('id', sa.Integer()),
        sa.column('image_url', sa.String()),
    )
    order_items = sa.table(
        'order_items',
        sa.column('product_id', sa.Integer()),
    )
    op.get_bind().execute(
        product_table.delete().where(
            product_table.c.image_url.in_(
                [product['image_url'] for product in PRODUCTS]
            ),
            ~product_table.c.id.in_(
                sa.select(order_items.c.product_id)
            ),
        )
    )
