from wagtail.core import blocks

class CalculatorBlock(blocks.StructBlock):
    heading = blocks.CharBlock(required=False)

    class Meta:
        icon = 'grip'
        label = 'Colins content'
        template = 'component/index.html'
